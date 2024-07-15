import React from "react";

const RequestBedspace = () => {
  return (
    <div className="">
      <h1 className="mb-3 text-lg font-bold md:text-xl">
        PROCEDURES FOR ALLOCATION & OCCUPATION OF BED SPACE
      </h1>
      <h2 className="text-base font-semibold md:text-lg">
        Allocation of Bedspace
      </h2>
      <ul className="mt-1 list-inside list-disc">
        <li className="list-disc">
          All Students will be allocated bedspaces by the ePortal on a first
          come-first-served basis
        </li>
      </ul>
      <h2 className="mt-1.5 text-base font-semibold md:text-lg">
        Occupation of bedspace
      </h2>
      Upon successfully allocated a bedspace, you are required to carry out the
      following within one month:
      <ul className="mt-1 list-inside list-disc">
        <li>
          Payment of all appropriate fees including accommodation fees (Please
          do not pay accommodation fees if you are not successful to get a bed
          space as no refund will be made for such).
        </li>
        <li>Print 3 copies of "Bedspace Clearance Form"</li>
        <li>
          Sign the "Bedspace Clearance Form" and present them to hall warden of
          the hall for signatories
        </li>
        <li>
          Submit the signed "Bedspace Clearance Form" as thus: 1 copy to DSA's
          Office, 1 copy to the hall warden and retain the last copy
        </li>
      </ul>
      <h2 className="mt-1.5 text-base font-semibold md:text-lg">
        Application for Bedspace
      </h2>
      <ul className="mt-1 list-inside list-disc">
        <li>
          From the students profile page on the E-PORTAL, simply click on
          "Request for Bed Space" under the INFORMATION ON ACCOMMODATION section
          of the profile page. The system will respond to your request if you
          meet the conditions for allocation of bedspaces stated above and
          subject to availability of bedspaces for the category of the students.
        </li>
      </ul>
      <h2 className="mt-1.5 text-base font-semibold md:text-lg">
        Forfeiting Award of Bedspace
      </h2>
      You will forfeit your award of Bed Space on the following conditions:
      <ul className="mt-1 list-inside list-disc">
        <li>
          Failure to pay the all appropriate fees at most one week before
          resumption of the session
        </li>
        <li>
          Failure to submit the "Bedspace Clearance Form" to the DSA and hall
          warden within a period of time to be determined by the Dean, Students
          Affairs
        </li>
        <li>
          Each of the above will lead to losing the bedspace to the pool for
          other students who need them.
        </li>
      </ul>
      <button className="mt-10 w-[300px] max-w-[600px] rounded-md bg-[#3182CE] p-2 text-center text-white">
        Request Bedspace
      </button>
    </div>
  );
};

export default RequestBedspace;
