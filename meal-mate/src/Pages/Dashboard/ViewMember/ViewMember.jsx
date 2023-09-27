import React from 'react';
import MemberTable from '../../../components/MemberTable/MemberTable';
import PageTitle from '../../../components/PageTitle/PageTitle';

const ViewMember = () => {
    return (
        <div>
            <PageTitle title={`Member List | Mess Mate`} />
            <div>
                <MemberTable />
            </div>
        </div>
    );
}

export default ViewMember;
