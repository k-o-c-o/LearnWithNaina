import { useParams } from "react-router-dom";
import {useEffect,useState } from "react";
import Navbar from "../components/Navbar";
import { getMaterials } from "../services/materialService";
import { useNavigate } from "react-router-dom";

function MaterialsPage() {
  const navigate = useNavigate();
  const { lessonId } =
    useParams();

  const [materials,
    setMaterials] =
    useState([]);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials =
    async () => {
      const data =
        await getMaterials(
          lessonId
        );

      setMaterials(data);
    };

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px"
        }}
      >
        <h1>Materials</h1>

        {materials.map(
          (material) => (
            <div
                key={material._id}
                onClick={() =>
                navigate(
                    `/material/${material._id}`
                )
                }
                
              style={{
                border:
                  "1px solid #ddd",
                padding:
                  "20px",
                marginBottom:
                  "20px"
              }}
            >
              {material.title}
            </div>
          )
        )}
      </div>
    </>
  );
}

export default MaterialsPage;