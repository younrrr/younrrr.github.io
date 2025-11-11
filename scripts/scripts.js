"use strict"
 document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } 
       
      });
    })

   
    const elements = document.querySelectorAll(".description1");
    elements.forEach(el => observer.observe(el));
  });
 document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } 
       
      });
    })

   
    const elements = document.querySelectorAll(".title2");
    elements.forEach(el => observer.observe(el));
  });
  
