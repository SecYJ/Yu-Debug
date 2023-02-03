import { useEffect, useRef, useState } from "react";

const App = () => {
	// tab的状态
	const [tab, setTab] = useState("map");
	// 是否为 mobile 的状态
	const [mobileSize, setMobileSize] = useState(false);

	// 类似于 Vue 的 Ref, useRef 可以用来控制 DOM 元素
	// 在 75 行可以看到操控 DOM, ref={mapRef}
	const mapRef = useRef();

	useEffect(() => {
		// 创建 Observer 实体
		const observer = new ResizeObserver((entries) => {
			// observer 触发后要做的事
			// 如果 mobile size 小于 1024, 就把 mobileSize 设为 true, 否则就是 false
			entries[0].target.offsetWidth < 1024 ? setMobileSize(true) : setMobileSize(false);
		});

		// observer 监听 html 的body
		observer.observe(document.body);

		// 这行可以理解为 Vue 的 unmounted, 在unmounted的时候移除监听
		return () => observer.disconnect();
	}, []);

	return (
		<>
			<div className="px-3 mb-4">
				<div
					className={`${
						!mobileSize ? "hidden" : ""
					} text-sm font-medium text-center text-gray-500 border-b border-gray-200`}
				>
					<ul className="flex flex-wrap -mb-px">
						<li className="mr-2">
							<a
								href="#"
								className={`${
									tab === "map" ? "border-blue-600 text-red-600" : "border-transparent"
								} inline-block p-4 border-b-2 rounded-t-lg`}
								aria-current="page"
								onClick={() => setTab("map")}
							>
								Map
							</a>
						</li>

						<li className="mr-2">
							<a
								href="#"
								className={`${
									tab === "list" ? "border-blue-600 text-blue-600" : "border-transparent"
								} inline-block p-4 border-b-2 rounded-t-lg`}
								onClick={() => setTab("list")}
							>
								List
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="flex px-3 flex-wrap flex-col lg:flex-row">
				{!mobileSize && (
					<>
						<div className="lg:w-[200px] lg:pr-3">Area A</div>
						<div className="flex-grow mapContainer h-screen bg-red-100" ref={mapRef}>
							AreaB
						</div>
					</>
				)}
				{mobileSize && tab === "map" && <div className="lg:w-[200px] lg:pr-3">Area A</div>}
				{mobileSize && tab === "list" && (
					<div className="flex-grow mapContainer h-screen bg-red-100" ref={mapRef}>
						AreaB
					</div>
				)}
			</div>
		</>
	);
};
export default App;
