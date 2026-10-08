export default function TemplateDataTable({ columns, rows, rowKey = "id", empty = "No records match this view." }) {
  if (!rows.length) return <p className="template-empty">{empty}</p>;

  return (
    <div className="template-table-wrap">
      <table className="template-table">
        <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[rowKey]}>
              {columns.map((column) => <td key={column.key} data-label={column.label}>{column.render ? column.render(row) : row[column.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
