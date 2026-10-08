"use client";
import { useEffect, useRef } from "react";
import "@/src/styles/components/animation/click-spark.css";
export default function ClickSpark({ children }) { const ref=useRef(null); useEffect(()=>{const el=ref.current;if(!el)return;const click=e=>{const spark=document.createElement("span");spark.className="click-spark";spark.style.left=`${e.clientX-el.getBoundingClientRect().left}px`;spark.style.top=`${e.clientY-el.getBoundingClientRect().top}px`;el.appendChild(spark);spark.addEventListener("animationend",()=>spark.remove())};el.addEventListener("click",click);return()=>el.removeEventListener("click",click)},[]);return <div ref={ref} className="click-spark-root">{children}</div> }
