gsap.registerPlugin(Flip);

let dockItemCount = 0;
let closedCount = 0;

const addbuttons = () => {
	document.querySelectorAll(".dashboard > div h2").forEach((h2) => {
		h2.innerHTML +=
			'<button class="close"></button><button class="minimize"></button><button class="expand"></button>';
	});
	document.body.innerHTML +=
		'<div id="dock"><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
	document.querySelectorAll(".dashboard > div").forEach((div) => {
		var children = div.innerHTML;
		var newContent = '<div class="wrapper closed">' + children + "</div>";
		div.innerHTML = newContent;
	});
	return Promise.resolve();
};

addbuttons().then((onResolved) => {
	addListeners();
	setTimeout(() => {
		document.body.classList.add("loaded");
	}, 100);
	document.querySelectorAll(".wrapper").forEach((window, index) => {
		setTimeout(() => {
			window.classList.remove("closed");
		}, index * 50 + 1000);
	});
});

const addListeners = () => {
	document.querySelectorAll("button.close").forEach((button, index) => {
		let window = button.parentNode.parentNode;
		button.addEventListener("click", function () {
			window.classList.add("closed");
			closedCount++;
			if (closedCount >= 7) {
				reopen();
			}
		});
	});

	const reopen = () => {
		document.querySelectorAll(".wrapper").forEach((window) => {
			setTimeout(() => {
				dockItemCount = 0;
				closedCount = 0;
				window.classList.remove("closed");
			}, 2000);
		});
	};

	document.querySelectorAll("button.minimize").forEach((button, index) => {
		let window = button.parentNode.parentNode;
		let windowParent = button.parentNode.parentNode.parentNode;
		let label = window.querySelector("h2").textContent;
		const dockTarget = document.querySelectorAll("#dock > div")[index];
		dockTarget.setAttribute("data-label", label);
		button.addEventListener("click", function () {
			const state = Flip.getState(window);
			dockTarget.classList.add("active");
			dockTarget.appendChild(window);
			dockItemCount++;
			document.body.style.setProperty("--count", dockItemCount);
			Flip.from(state, {
				duration: 0.3,
				ease: "circ.inOut",
				absolute: true
			});
		});
		dockTarget.addEventListener("click", function () {
			const state = Flip.getState(window);
			windowParent.appendChild(window);
			dockTarget.classList.remove("active");
			dockItemCount--;
			document.body.style.setProperty("--count", dockItemCount);
			Flip.from(state, {
				duration: 0.3,
				ease: "circ.inOut",
				scale: true,
				absolute: true
			});
		});
	});
};

Draggable.create(".dashboard > div", {
	type: "x,y",
	inertia: true
});