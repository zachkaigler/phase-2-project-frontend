import CommentSection from "./CommentSection";
import ContributorCard from "./ContributorCard";
import ContributorFilter from "./ContributorFilter";

function PoliticianInfo() {
    return (
        <>
        <h1>Politician Info</h1>

            <ContributorCard />
            <ContributorFilter />
            <CommentSection />
        </>
    )
}

export default PoliticianInfo