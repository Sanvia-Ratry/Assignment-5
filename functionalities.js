console.log("testing js.....");

if (sessionStorage.getItem("isAuthenticated") !== "true") {
  window.location.replace("login.html");
}

// loading all Data...
const all_data_url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const getAllData = () => {
  fetch(all_data_url)
    .then((res) => res.json())
    .then((obj) => dynamic_btn(obj));
};

getAllData();
const Show_all_data = (obj, allBtn, openBtn, closeBtn) => {
  openBtn.classList.add("btn");
  openBtn.classList.remove("activeBtn");
  closeBtn.classList.add("btn");
  closeBtn.classList.remove("activeBtn");

  allBtn.classList.add("activeBtn");
  allBtn.classList.remove("btn");
  const total = obj.data;
  updateCount(total.length);
  obj.data.forEach((item) => {
    showItem(item);
  });
};
const showTab = (obj) => {
  const cardSection = document.getElementById("card-section");
  const tabInfo = `<div id="tab-info" class="flex items-center justify-between p-6 bg-white">
        <div class="flex items-center gap-2">
          <div class="border-transparent rounded-full p-1 bg-[#ECE4FF]">
            <img src="./assets/Aperture.png" />
          </div>
          <div>
            <h1 id="count" class="text-xl font-semibold">${obj.data.length} Issues</h1>
            <p class="light-color">Track and manage your project issues</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div>
            <span
              class="w-3 h-3 border border-slate-400 bg-green-500 rounded-full inline-block"
            ></span>
            <span class="text-sm font-medium">Open</span>
          </div>

          <div>
            <span
              class="w-3 h-3 border border-slate-400 bg-purple-500 rounded-full inline-block"
            ></span>
            <span class="text-sm font-medium">Closed</span>
          </div>
        </div>
      </div>`;
  cardSection.insertAdjacentHTML("afterbegin", tabInfo);
};
const updateCount = (count) => {
  const counterId = document.getElementById("count");
  counterId.innerText = count;
};
const showItem = (card) => {
  const cardContainer = document.getElementById("card-container");

  const newCard = `${card.priority === "low" ? `<div class="flex flex-col border-t-4  border-t-purple-500 shadow-md rounded-xl font-medium w-full bg-white">` : `<div class="flex flex-col border-t-4  border-t-[#00A96E] shadow-md rounded-xl font-medium w-full bg-white">`}
      

        <div class="p-4 space-y-[8px]">
            <div class="flex justify-between ">${
              card.priority === "low"
                ? `<img class="self-center" src="./assets/closed-status.png"><button class="border border-transparent h-[24px] w-[80px] low-highlight rounded-full text-[12px] font-medium" >
            ${card.priority}
          </button>`
                : card.priority === "medium"
                  ? `<img class="self-center" src="./assets/Open-Status.png"><button class="border border-transparent h-[24px] w-[80px] secondary-highlight rounded-full text-[12px] font-medium" >
            ${card.priority}
          </button>`
                  : `<img class="self-center" src="./assets/Open-Status.png"><button class="border border-transparent h-[24px] w-[80px] primary-highlight rounded-full text-[12px] font-medium" >
            ${card.priority}
          </button>`
            }

        </div>
        <div>
        <h1 class="text-sm">${card.title}</h1>
        <p class="light-color text-xs line-clamp-2">
          ${card.description}
        </p></div>
        <div class="flex flex-wrap gap-2">
          <button class="flex items-center gap-1 border border-transparent p-2 primary-highlight rounded-full px-2 py-0.5 text-[11px] font-medium" >
            <i class="fa-solid fa-bug"></i>${card.labels[0]}
          </button>${
            card.labels[0] === "enhancement" ||
            card.labels[0] === "documentation" ||
            !card.labels[1] ||
            card.labels[1] === "undefined"
              ? ""
              : `
              <button class="flex items-center gap-1 border border-transparent p-2 secondary-highlight rounded-full px-2 py-0.5 text-[11px] font-medium">
                <i class="fa-solid fa-gear"></i>${card.labels[1]}
              </button>
            `
          }
        </div>
        </div>
        <hr class="border-t border-slate-300" />
      <div class="p-4 space-y-[12px]">
        <p class="light-color text-xs">#${card.id} by ${card.author}</p>
        <p class="light-color text-xs">${new Date(card.createdAt).toLocaleDateString("en-US")}</p>
      </div>
      </div>
      `;
  cardContainer.insertAdjacentHTML("beforeend", newCard);
};
const dynamic_btn = (obj) => {
  const allBtn = document.createElement("button");
  const openBtn = document.createElement("button");
  const closeBtn = document.createElement("button");

  allBtn.innerText = "All";
  allBtn.classList.add("activeBtn");
  openBtn.innerText = "open";
  openBtn.classList.add("btn");
  closeBtn.innerText = "close";
  closeBtn.classList.add("btn");

  allBtn.id = "all-btn";
  openBtn.id = "open-btn";
  closeBtn.id = "close-btn";

  const sectionBtn = document.getElementById("btn-container");
  sectionBtn.appendChild(allBtn);
  sectionBtn.appendChild(openBtn);
  sectionBtn.appendChild(closeBtn);

  openBtn.addEventListener("click", () =>
    show_selective_data("open", obj, openBtn, closeBtn, allBtn),
  );
  allBtn.addEventListener("click", () => Show_all_data(obj, allBtn, openBtn, closeBtn));
  closeBtn.addEventListener("click", () =>
    show_selective_data("closed", obj, openBtn, closeBtn, allBtn),
  );

  showTab(obj);
  Show_all_data(obj, allBtn, openBtn, closeBtn);
};

const show_selective_data = (s, obj, openBtn, closeBtn, allBtn) => {
  if (s == "open") {
    openBtn.classList.add("activeBtn");
    openBtn.classList.remove("btn");

    closeBtn.classList.remove("activeBtn");
    closeBtn.classList.add("btn");
  }
  if (s == "closed") {
    closeBtn.classList.add("activeBtn");
    closeBtn.classList.remove("btn");
    openBtn.classList.remove("activeBtn");
    openBtn.classList.add("btn");
  }

  allBtn.classList.add("btn");
  allBtn.classList.remove("activeBtn");

  const total = obj.data.filter((item) => item.status === s);
  updateCount(total.length);
  document.getElementById("card-container").innerHTML = "";
  obj.data.forEach((item) => {
    if (item.status === s) {
      showItem(item);
    }
  });
};
