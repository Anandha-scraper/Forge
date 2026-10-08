# Forge

Forge is a reusable event-platform SaaS. It turns a configurable event product into an isolated, deployable tenant environment for each organisation.

The first reference implementation is Spring Fest, but Spring Fest is not the product boundary. Event name, branding, dates, description, events, schedule, contacts, payment mode, registration rules, and operational settings must eventually come from tenant administration data rather than hardcoded frontend files.

## Product idea

Forge has two layers:

1. **Control plane** — the super-admin system owned by Forge. It approves organisations, provisions their infrastructure, tracks deployment state, manages subscriptions, and retires tenant environments.
2. **Tenant application** — the event frontend and backend deployed for one approved organisation. Each tenant has its own runtime configuration and data boundary.

The target lifecycle is:

```text
Organisation applies
        ↓
Super admin reviews and approves
        ↓
Tenant record becomes PROVISIONING
        ↓
Infrastructure is created with Terraform
        ↓
Docker images are built and deployed
        ↓
Database, storage, secrets, domain, and health checks are configured
        ↓
Tenant becomes ACTIVE
        ↓
Organisation runs its event
        ↓
Tenant is suspended, archived, or deprovisioned
```

Approval alone does not create GCP resources. The control plane must trigger a secured provisioning workflow. DNS records also require either a DNS-provider integration or a human DNS action; Cloud Run can provide the required mapping records and managed certificate process, but it cannot update an unrelated registrar automatically.

## Current repository structure

```text
Forge/
├── .github/
│   └── workflows/                 # GitHub Actions pipelines
├── backend/                       # Tenant backend template
│   ├── auth/                      # Authentication and identity resolution
│   ├── config/                    # Runtime configuration and providers
│   ├── controllers/               # HTTP request/response adapters
│   ├── middleware/                # Auth, validation, errors, uploads, limits
│   ├── routes/                    # API route declarations
│   ├── scripts/                   # Tenant maintenance and migration scripts
│   ├── services/                  # Business rules and use cases
│   ├── types/                     # Shared backend types/contracts
│   └── utils/                     # Small cross-cutting helpers
├── frontend/                      # Tenant frontend template
│   ├── app/                       # Next.js App Router routes
│   ├── public/                    # Tenant static assets
│   └── src/
│       ├── components/            # Reusable UI and animation primitives
│       ├── features/              # Feature-owned screens and components
│       └── styles/                # Tokens, base styles, and shared CSS
├── control-plane/
│   ├── backend/                   # Super-admin API and provisioning orchestration
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   └── frontend/                  # Super-admin dashboard
│       ├── app/
│       ├── public/
│       └── src/
├── docker/
│   ├── tenant-frontend/            # Tenant frontend image definition
│   ├── tenant-backend/             # Tenant backend image definition
│   ├── control-plane-frontend/     # Control-plane frontend image definition
│   └── control-plane-backend/      # Control-plane backend image definition
├── infra/
│   └── terraform/
│       ├── modules/                # Reusable GCP modules
│       │   ├── tenant-project/
│       │   ├── cloud-run/
│       │   ├── firestore/
│       │   ├── storage/
│       │   ├── secrets/
│       │   ├── iam/
│       │   ├── dns/
│       │   └── artifact-registry/
│       └── environments/           # Platform, staging, and tenant states
├── deployment/
│   ├── provisioning/               # Create and configure tenant environments
│   ├── deprovisioning/             # Safe tenant retirement workflow
│   ├── health-checks/              # Deployment readiness checks
│   └── migrations/                 # Data/schema migration procedures
├── scripts/
│   ├── ci/                         # Validation and build helpers
│   ├── cd/                         # Deployment helpers
│   └── tenant-lifecycle/           # Provision, suspend, archive, delete
├── docs/
│   ├── architecture/
│   ├── operations/
│   ├── security/
│   └── runbooks/
└── ops/
    ├── monitoring/
    ├── alerts/
    └── backups/
```

Some directories are intentionally empty while the platform is being built. They represent ownership boundaries, not completed features.

## Tenant application architecture

The tenant application follows strict layering:

```text
Frontend page/view
        ↓
Frontend API client / auth hook
        ↓
Tenant backend route
        ↓
Controller
        ↓
Service
        ↓
Repository/provider
        ↓
Firestore, Storage, payment gateway, or external service
```

Controllers should stay thin. Business rules belong in services. Frontend components should not contain direct infrastructure calls, payment secrets, or deployment logic.

Tenant configuration should eventually include:

- organisation and event identity
- logo, colours, typography, and public copy
- event categories and event definitions
- schedule and venue data
- registration windows and capacity rules
- screenshot or gateway payment mode
- payment provider configuration references
- contact and support details
- domain and deployment metadata

The frontend should read public configuration through an API or generated tenant configuration. Secrets must stay in Secret Manager and must never use `NEXT_PUBLIC_*` variables.

## Control-plane responsibilities

The control plane is the only system allowed to provision or destroy tenant infrastructure.

It should own an organisation/tenant registry containing:

```text
tenant_id
organisation_name
owner/contact
tenant_project_id
frontend_service
backend_service
firestore_database
storage_bucket
domain
payment_mode
lifecycle_status
created_at
updated_at
deleted_at
```

Recommended lifecycle states:

```text
APPLIED
APPROVED
PROVISIONING
DEPLOYING
VERIFYING
ACTIVE
SUSPENDED
DEPROVISIONING
DELETED
FAILED
```

The control plane must record every provisioning attempt, command/job identifier, failure reason, and operator. A tenant must not become `ACTIVE` until deployment, database access, storage access, domain status, and health checks succeed.

## GCP deployment model

The preferred first production model is one GCP project per tenant:

```text
Tenant GCP project
├── Cloud Run frontend service
├── Cloud Run backend service
├── Firestore database
├── Cloud Storage bucket
├── Secret Manager secrets
├── Tenant service accounts and IAM
└── Optional domain/load-balancer resources
```

Cloud Run services are deployed from Docker images and autoscale the underlying runtime instances. Terraform owns infrastructure; CI/CD owns image build and deployment orchestration. The control plane should not run arbitrary shell commands from user input.

Tenant deletion must account for application data and infrastructure separately. The workflow should remove or archive registrations, uploaded files, authentication identities, secrets, Cloud Run services, scheduled jobs, domain mappings, logs, and backups according to the retention policy. Deletion must be explicit, audited, idempotent, and recoverable during a grace period where possible.

## Docker and CI/CD strategy

The intended pipeline is:

```text
Pull request
  → install dependencies
  → static checks
  → unit/integration tests
  → Docker build
  → image vulnerability scan

Merge to main
  → push immutable image to Artifact Registry
  → deploy to staging
  → smoke tests
  → approval gate
  → deploy production or tenant environment
```

GitHub Actions is the planned CI/CD platform. GCP authentication should use OIDC/Workload Identity Federation rather than long-lived service-account JSON keys. Terraform state must be remote, protected, and separated by environment; tenant provisioning must not share an unsafe global state file.

## Payment modes

Payment mode is tenant configuration, not a separate codebase:

```text
payment_mode = screenshot
```

or:

```text
payment_mode = gateway
```

Screenshot mode stores proof metadata and sends the registration through an admin approval flow. Gateway mode creates/verifies orders through the backend and validates provider signatures server-side. Both modes must use the same registration domain model and lifecycle, with only the payment adapter changing.

## Development rules

- Read the relevant module header and architecture notes before changing a module.
- Keep control-plane code separate from tenant application code.
- Keep tenant data out of the control-plane database.
- Never expose payment, Firebase Admin, Terraform, or GCP credentials to browsers.
- Prefer configuration and adapters over tenant-specific forks.
- Make provisioning and deletion idempotent; retries are expected.
- Treat tenant isolation, IAM, DNS, payment, and deletion as security-sensitive areas.
- Do not claim a tenant is active from a successful build alone; verify the deployed service and its dependencies.
- Do not modify SpringFest as part of Forge work. It is a behavioural and visual reference only.

## Working locally

The frontend currently contains the active Forge marketing page. Once the frontend package is available locally:

```bash
cd frontend
npm install
npm run dev
```

The first implementation phase is frontend-focused. Backend and control-plane services will be built in separate workstreams, with their API contracts documented before integration.

## Planned implementation order

1. Stabilise the tenant frontend design system and configurable landing page.
2. Define tenant configuration and public API contracts.
3. Build the tenant backend with authentication, events, registrations, payments, and storage.
4. Build the control-plane tenant registry and super-admin authentication.
5. Add Terraform modules and staging provisioning.
6. Add Docker images and GitHub Actions validation/deployment pipelines.
7. Add automated tenant provisioning with approval gates and health checks.
8. Add domain automation, monitoring, backups, suspension, and deprovisioning.

Forge is successful when a new organisation can be approved, configured, deployed, operated, suspended, and safely removed without modifying the application source code for that organisation.
