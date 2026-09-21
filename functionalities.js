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

  const sectionBtn = document.getElementById("btn-container");
  sectionBtn.appendChild(allBtn);
  sectionBtn.appendChild(openBtn);
  sectionBtn.appendChild(closeBtn);
  Show_all_data(obj);
};

const Show_all_data = (obj) => {
  obj.data.forEach((item) => {
    showItem(item);
  });
};

const showItem = (card) => {
  const cardContainer = document.getElementById("card-container");

  const newCard = `
      <div class="flex flex-col border-t-4 border-t-[#00A96E] shadow-md rounded-xl font-medium w-full">
      
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
        <div class="flex gap-2">
          <button class="flex items-center gap-1 border border-transparent p-2 primary-highlight rounded-full text-[12px] font-medium" >
            <i class="fa-solid fa-bug"></i>${card.labels[0]}
          </button>${
            card.labels[0] === "enhancement" ||
            card.labels[0] === "documentation" ||
            !card.labels[1] ||
            card.labels[1] === "undefined"
              ? ""
              : `
              <button class="flex items-center gap-1 border border-transparent p-2 secondary-highlight rounded-full text-[12px] font-medium">
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
