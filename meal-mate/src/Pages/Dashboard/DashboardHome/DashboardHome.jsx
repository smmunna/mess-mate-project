import PageTitle from "../../../components/PageTitle/PageTitle";

const DashboardHome = () => {
    return (
        <div>
            <PageTitle title={`Dashboard Home | Mess Mate`}/>
                <div>
                    <h3 className="text-center text-2xl font-bold py-4">How to use this software ?</h3>
                </div>
                <hr />

            <div className="mt-4 lg:w-[600px]  m-auto">
                <div className="video">
                    <iframe
                        src={`https://www.youtube.com/embed/1eifq_kj0Ho?si=s8LLfQUb7jhuZQew`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>



        </div>
    );
}

export default DashboardHome;
