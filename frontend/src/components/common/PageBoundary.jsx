"use client";
import { Component } from "react";
export default class PageBoundary extends Component { state={error:null};static getDerivedStateFromError(error){return {error}};render(){return this.state.error?<div className="page-error">This page could not be displayed.</div>:this.props.children} }
