
const Home = () => {
    return (
        <div>

            <section className="relative bg-blueGray-50">
                <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                    <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
                    }}>
                        <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
                    </div>
                    <div className="container relative mx-auto">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                <div className="lg:pr-12">
                                    <h1 className="text-white font-semibold text-5xl">
                                        Introducing Mess Mate.
                                    </h1>
                                    <p className="mt-4 text-lg text-blueGray-200 leading-[2]">
                                        Your trusted companion for seamless <span className="bg-yellow-300 p-2 text-xl font-bold text-black">Meal Expense Management</span> . Say goodbye to the hassle of monthly calculations and hello to effortless financial harmony.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
                        <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                    </div>
                </div>
                <section className="pb-10 bg-blueGray-200 -mt-24">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap">
                            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                                            <i className="fas fa-award"></i>
                                        </div>
                                        <h6 className="text-xl font-semibold">Simplified Meal Sharing</h6>
                                        <p className="mt-2 mb-4 text-blueGray-500">
                                            Mess Mate makes meal expenses effortless for your group of friends. Share costs, calculate totals, and enjoy financial harmony.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                                            <i className="fas fa-retweet"></i>
                                        </div>
                                        <h6 className="text-xl font-semibold">Effortless Revisions</h6>
                                        <p className="mt-2 mb-4 text-blueGray-500">
                                            With Mess Mate, revisions are hassle-free. Update expenses and see real-time changes, keeping everyone engaged and informed.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                                            <i className="fas fa-fingerprint"></i>
                                        </div>
                                        <h6 className="text-xl font-semibold">Trusted and Verified</h6>
                                        <p className="mt-2 mb-4 text-blueGray-500">
                                            Mess Mate is built with trust in mind. Just login with google and access your activity from the dashboard. Ensuring a secure and reliable platform for your meal expenses.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <footer className="relative pt-8 pb-6 mt-1">
                            <div className="container mx-auto px-4">
                                <div className="flex flex-wrap items-center md:justify-between justify-center">
                                    <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                        <div className="text-sm text-blueGray-500 font-semibold py-1">
                                            Developed by <a href="https://www.facebook.com/smmunna21" className="text-blueGray-500 hover:text-gray-800" target="_blank">Minhazul Abedin Munna</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer> */}
                    </div>
                </section>

            </section>

        </div>
    );
}

export default Home;
