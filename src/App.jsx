import { useEffect, useRef, useState } from "react";

const App = () => {
	const [tab, setTab] = useState("map");
	const [mobileSize, setMobileSize] = useState(false);
	const mapRef = useRef();

	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			entries[0].target.offsetWidth < 1024 ? setMobileSize(true) : setMobileSize(false);
		});

		observer.observe(document.body);
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
