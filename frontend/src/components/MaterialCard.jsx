import "../styles/MaterialCard.css";

function MaterialCard({ material, onClick }) {

    return(

        <div
            className="lesson-card"
            onClick={onClick}
        >

            <h3>
                {material.title}
            </h3>

        </div>

    );

}

export default MaterialCard;