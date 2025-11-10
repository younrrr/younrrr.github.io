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
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px"
  });


  const rlObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const rect = entry.target.getBoundingClientRect();
      const horizontallyVisible = rect.left < window.innerWidth && rect.right > 0;

      if (entry.isIntersecting && horizontallyVisible) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.2
  });


  const normalElements = document.querySelectorAll(".title, .title2, .hobby1, .rust, .map, .rl, .soccer, .description, .winpic");
  normalElements.forEach(el => {
    el.classList.remove("show");
    observer.observe(el);
  });

  
 
});


const paragraphs = [...document.querySelectorAll('.description2')];
paragraphs.forEach(p => {
  const chars = p.textContent.split('');
  p.innerHTML = chars.map(ch => `<span class="char">${ch}</span>`).join('');
});
const spans = [...document.querySelectorAll('.description2 .char')];

function revealSpans() {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;


  const revealOffset = viewportHeight * 0.75;

  const verticalRate = 0.012;
  const stagger = 0.025;


  const linesMap = new Map();
  spans.forEach(span => {
    const rect = span.getBoundingClientRect();
    const top = Math.round(rect.top);
    if (!linesMap.has(top)) linesMap.set(top, []);
    linesMap.get(top).push(span);
  });
  const lines = [...linesMap.entries()].sort((a, b) => a[0] - b[0]);

  let allowNext = true;

  for (let i = 0; i < lines.length; i++) {
    const [lineTop, lineSpans] = lines[i];

    if (!allowNext) {
      lineSpans.forEach(s => (s.style.opacity = 0.1));
      continue;
    }

    const topRel = lineTop;
    let progress = 1 - ((topRel - revealOffset) * verticalRate);
    progress = Math.max(0, Math.min(1, progress));

    let avg = 0;
    lineSpans.forEach((s, j) => {
      const left = s.getBoundingClientRect().left;
      let opacityValue =
        1 - ((topRel - revealOffset) * verticalRate + left * 0.0004);

      opacityValue = Math.min(Math.max(opacityValue - j * stagger, 0.1), 1);
      s.style.opacity = opacityValue.toFixed(3);
      avg += opacityValue;
    });
    avg /= lineSpans.length;


    allowNext = avg > .9;
  }
}
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      revealSpans();
      ticking = false;
    });
    ticking = true;
  }
});
revealSpans();


function setupHorizontalScroll() {

  const wrapper = document.getElementById("horizontal-wrapper");
  const inner   = wrapper.querySelector(".inner");

  function updateWrapperHeight() {
    
    const scrollWidth = inner.scrollWidth - window.innerWidth;
    wrapper.style.minHeight = (scrollWidth + window.innerHeight) + "px";
  }
  updateWrapperHeight();
  window.addEventListener("resize", updateWrapperHeight);

  window.addEventListener("scroll", function () {
    const start   = wrapper.offsetTop;
    const end     = start + wrapper.offsetHeight - window.innerHeight;
    const scrollY = window.scrollY;
    
    wrapper.className = '';

    if (scrollY >= end) {
  
      wrapper.classList.add('post-sticky');
      inner.style.transform = `translateX(-${inner.scrollWidth - window.innerWidth}px)`;
    } else if (scrollY >= start) {
  wrapper.classList.add('sticky');

  const progress     = (scrollY - start) / (end - start);
  const maxTranslate = inner.scrollWidth - window.innerWidth;
  const speedFactor = 1.7; 
  inner.style.transform = `translateX(-${progress * maxTranslate * speedFactor}px)`;
}
    else {
      wrapper.classList.add('pre-sticky');
      inner.style.transform = 'translateX(0)';
    }
  });
}
document.addEventListener("DOMContentLoaded",  setupHorizontalScroll);
const rust = document.querySelector(".rust");
let rotation = 0;

function spinOnScroll() {
  const scrollY = window.scrollY;
  rotation = scrollY * 0.5; // adjust 0.5 for speed
  rust.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  requestAnimationFrame(spinOnScroll);
}

requestAnimationFrame(spinOnScroll);