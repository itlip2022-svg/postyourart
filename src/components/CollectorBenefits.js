import { t } from '../utils/i18n.js';

export function CollectorBenefits() {
  return `
    <section class="section collector-benefits" id="channels">
      <div class="container">
        <div class="grid-2 reverse-mobile">
          <div class="visual-col">
             <div class="discovery-visual" style="display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at center, rgba(255,170,0,0.08), transparent 70%); border-radius: 12px; overflow: hidden; min-height: 500px;">
               <svg style="width: 100%; height: 100%; max-height: 600px;" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                 <defs>
                   <linearGradient id="rayGrad" x1="400" y1="400" x2="400" y2="90" gradientUnits="userSpaceOnUse">
                     <stop offset="0%" stop-color="#ffaa00" stop-opacity="0.8"/>
                     <stop offset="90%" stop-color="#ffaa00" stop-opacity="0.1"/>
                     <stop offset="100%" stop-color="#ffaa00" stop-opacity="0.0"/>
                   </linearGradient>
                   <filter id="glow">
                     <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                     <feMerge>
                       <feMergeNode in="coloredBlur"/>
                       <feMergeNode in="SourceGraphic"/>
                     </feMerge>
                   </filter>
                   <!-- Defines a single wavy frequency ray going up -->
                   <path id="wave-ray" d="M 400 400 L 400 320 Q 370 300, 400 280 T 400 240 T 400 200 T 400 160 L 400 90" fill="none"/>
                   
                   <style>
                     @keyframes pulse-ray {
                       0% { stroke-dashoffset: 40; opacity: 0.6; stroke-width: 2px; }
                       50% { opacity: 1; stroke-width: 3.5px; filter: url(#glow); }
                       100% { stroke-dashoffset: 0; opacity: 0.6; stroke-width: 2px; }
                     }
                     @keyframes pulse-star {
                       0% { transform: scale(1); filter: url(#glow); opacity: 0.8; }
                       50% { transform: scale(1.25); filter: url(#glow) drop-shadow(0 0 30px rgba(255,170,0,0.8)); opacity: 1; }
                       100% { transform: scale(1); filter: url(#glow); opacity: 0.8; }
                     }
                     .ray { 
                       stroke: url(#rayGrad); 
                       stroke-dasharray: 8 8; 
                       animation: pulse-ray 1.2s linear infinite; 
                     }
                     .center-star {
                       animation: pulse-star 1.5s ease-in-out infinite;
                       transform-origin: 400px 400px;
                     }
                     .node-circle { fill: #1a1a20; stroke: #444; stroke-width: 2.5; transition: all 0.3s ease; }
                     .node:hover .node-circle { stroke: #ffaa00; filter: url(#glow); transform: scale(1.1); transform-origin: 400px 90px; }
                     .node-text { fill: #ffffff; font-family: 'Inter', sans-serif; font-weight: 700; text-anchor: middle; transition: all 0.3s ease; pointer-events: none; }
                     .node:hover .node-text { fill: #ffaa00; font-size: 110%; }
                   </style>
                 </defs>

                 <!-- Nodes = ray + circle + text -->
                 <!-- 0: Instagram -->
                 <g class="node" style="cursor: pointer;" transform="rotate(0 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="54"/>
                    <text class="node-text" x="400" y="95" font-size="14px" transform="rotate(0 400 90)">Instagram</text>
                 </g>
                 <!-- 1: Facebook, angle 40 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(40 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="56"/>
                    <text class="node-text" x="400" y="95" font-size="14px" transform="rotate(-40 400 90)">Facebook</text>
                 </g>
                 <!-- 2: Shopify, angle 80 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(80 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="48"/>
                    <text class="node-text" x="400" y="95" font-size="14px" transform="rotate(-80 400 90)">Shopify</text>
                 </g>
                 <!-- 3: Website, angle 120 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(120 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="52"/>
                    <text class="node-text" x="400" y="95" font-size="15px" transform="rotate(-120 400 90)">Website</text>
                 </g>
                 <!-- 4: Pinterest, angle 160 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(160 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="54"/>
                    <text class="node-text" x="400" y="95" font-size="14px" transform="rotate(-160 400 90)">Pinterest</text>
                 </g>
                 <!-- 5: PDF, angle 200 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(200 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="44"/>
                    <text class="node-text" x="400" y="96" font-size="16px" transform="rotate(-200 400 90)">PDF</text>
                 </g>
                 <!-- 6: Google, angle 240 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(240 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="50"/>
                    <text class="node-text" x="400" y="95" font-size="15px" transform="rotate(-240 400 90)">Google</text>
                 </g>
                 <!-- 7: YouTube, angle 280 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(280 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="56"/>
                    <text class="node-text" x="400" y="95" font-size="15px" transform="rotate(-280 400 90)">YouTube</text>
                 </g>
                 <!-- 8: Print, angle 320 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(320 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="46"/>
                    <text class="node-text" x="400" y="95" font-size="15px" transform="rotate(-320 400 90)">Print</text>
                 </g>

                 <!-- Center Star (Drawn LAST so it sits on top of all converging rays) -->
                 <g class="center-star" style="cursor: pointer;">
                   <circle cx="400" cy="400" r="60" fill="#1a1a20" stroke="#ffaa00" stroke-width="3"/>
                   <path d="M400 355 L412 385 L445 385 L418 405 L428 435 L400 415 L372 435 L382 405 L355 385 L388 385 Z" fill="#ffaa00"/>
                 </g>
               </svg>
             </div>
          </div>
          <div class="content-col">
            <h2 class="section-title">${t('channels.title')}</h2>
            <p class="lead" style="margin-bottom: 2rem;">${t('channels.lead')}</p>
            <ul class="feature-list">
              <li>
                ${t('channels.list.l1')}
              </li>
              <li>
                ${t('channels.list.l2')}
              </li>
              <li>
                ${t('channels.list.l3')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}
