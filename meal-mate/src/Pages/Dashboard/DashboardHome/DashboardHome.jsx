import PageTitle from "../../../components/PageTitle/PageTitle";

const DashboardHome = () => {
    return (
        <div>
            <PageTitle title={`Dashboard Home | Mess Mate`} />
            <div>
                <h3 className="text-center text-2xl font-bold py-4">How to use this software ?</h3>
            </div>
            <hr />

            <div className="mt-4 lg:w-[600px]  m-auto">
                <div className="video">
                    <iframe
                        src={`https://www.youtube.com/embed/rvrToMDUe-s?si=IAPgxg01rihU4t8r`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <div className="flex justify-center my-5">
                <div className="space-y-2">
                    <div>
                        <h3 className="text-2xl font-bold">Follow the instruction:</h3>
                    </div>
                    <div>
                        <p>1. Go to the <span>Request for Manager</span> Tab and send the request</p>
                        <p>2. After accepting the request by admin, you will see <span>Manager Activity Tab</span></p>
                        <p>3. You can add member,add/view member, add/view/update money, add/update daily meal, add/update daily bazar and you can the current status of this month</p>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default DashboardHome;
