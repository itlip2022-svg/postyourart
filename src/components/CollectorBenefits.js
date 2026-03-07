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
                     @keyframes pulse-dot {
                       0% { transform: scale(1); filter: url(#glow); opacity: 0.85; }
                       50% { transform: scale(1.3); filter: url(#glow) drop-shadow(0 0 40px rgba(255,170,0,0.9)); opacity: 1; }
                       100% { transform: scale(1); filter: url(#glow); opacity: 0.85; }
                     }
                     .ray { 
                       stroke: url(#rayGrad); 
                       stroke-dasharray: 8 8; 
                       animation: pulse-ray 1.2s linear infinite; 
                     }
                     .center-dot {
                       animation: pulse-dot 1.5s ease-in-out infinite;
                       transform-origin: 400px 400px;
                     }
                     .node-circle { fill: #1a1a20; stroke: #444; stroke-width: 2.5; transition: all 0.3s ease; }
                     .node:hover .node-circle { stroke: #ffaa00; filter: url(#glow); transform: scale(1.05); transform-origin: 400px 90px; }
                     .node-text { fill: #ffffff; font-family: 'Inter', sans-serif; font-weight: 700; text-anchor: middle; transition: all 0.3s ease; pointer-events: none; }
                     .node:hover .node-text { fill: #ffaa00; font-size: 105%; }
                     .node-logo { fill: rgba(255,255,255,0.7); transition: all 0.3s ease; pointer-events: none; }
                     .node:hover .node-logo { fill: #ffaa00; }
                   </style>
                 </defs>

                 <!-- Nodes = ray + circle + text + logo -->
                 <!-- 0: Instagram -->
                 <g class="node" style="cursor: pointer;" transform="rotate(0 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="92"/>
                    <g transform="rotate(0 400 90)">
                      <text class="node-text" x="400" y="80" font-size="24px">Instagram</text>
                      <svg class="node-logo" x="382" y="95" width="36" height="36" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                    </g>
                 </g>
                 <!-- 1: Facebook, angle 40 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(40 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="94"/>
                    <g transform="rotate(-40 400 90)">
                      <text class="node-text" x="400" y="80" font-size="24px">Facebook</text>
                      <svg class="node-logo" x="382" y="95" width="36" height="36" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>
                    </g>
                 </g>
                 <!-- 2: Shopify, angle 80 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(80 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="86"/>
                    <g transform="rotate(-80 400 90)">
                      <text class="node-text" x="400" y="80" font-size="24px">Shopify</text>
                      <svg class="node-logo" x="382" y="95" width="36" height="36" viewBox="0 0 24 24"><path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z"/></svg>
                    </g>
                 </g>
                 <!-- 3: Website, angle 120 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(120 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="90"/>
                    <g transform="rotate(-120 400 90)">
                      <text class="node-text" x="400" y="79" font-size="25px">Website</text>
                      <svg class="node-logo" x="382" y="93" width="36" height="36" viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/></svg>
                    </g>
                 </g>
                 <!-- 4: Pinterest, angle 160 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(160 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="92"/>
                    <g transform="rotate(-160 400 90)">
                      <text class="node-text" x="400" y="80" font-size="24px">Pinterest</text>
                      <svg class="node-logo" x="382" y="95" width="36" height="36" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                    </g>
                 </g>
                 <!-- 5: PDF, angle 200 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(200 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="82"/>
                    <g transform="rotate(-200 400 90)">
                      <text class="node-text" x="400" y="80" font-size="26px">PDF</text>
                      <svg class="node-logo" x="382" y="93" width="36" height="36" viewBox="0 0 16 16"><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/><path d="M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z"/></svg>
                    </g>
                 </g>
                 <!-- 6: Google, angle 240 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(240 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="88"/>
                    <g transform="rotate(-240 400 90)">
                      <text class="node-text" x="400" y="80" font-size="25px">Google</text>
                      <svg class="node-logo" x="382" y="95" width="36" height="36" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                    </g>
                 </g>
                 <!-- 7: YouTube, angle 280 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(280 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="94"/>
                    <g transform="rotate(-280 400 90)">
                      <text class="node-text" x="400" y="80" font-size="25px">YouTube</text>
                      <svg class="node-logo" x="382" y="95" width="36" height="36" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </g>
                 </g>
                 <!-- 8: Print, angle 320 -->
                 <g class="node" style="cursor: pointer;" transform="rotate(320 400 400)">
                    <use href="#wave-ray" class="ray" />
                    <circle class="node-circle" cx="400" cy="90" r="84"/>
                    <g transform="rotate(-320 400 90)">
                      <text class="node-text" x="400" y="80" font-size="25px">Print</text>
                      <svg class="node-logo" x="382" y="93" width="36" height="36" viewBox="0 0 16 16"><path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/><path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/></svg>
                    </g>
                 </g>

                 <!-- Center Dot (Drawn LAST so it sits on top of all converging rays) -->
                 <g class="center-dot" style="cursor: pointer;">
                   <circle cx="400" cy="400" r="70" fill="#1a1a20" stroke="#ffaa00" stroke-width="4"/>
                   <circle cx="400" cy="400" r="45" fill="#ffaa00" />
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
