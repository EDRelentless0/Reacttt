import React from "react";

function Homepage() {
  return (
    <div>
      <div style={{ display: "flex", position: "relative" }}>
        <span
          style={{
            marginLeft: "160px",
            position: "absolute",
            color: "rgba(255, 78, 0, 0.8)",
            fontSize: "90px",
            zIndex: "1000",
            userSelect: "none",
            fontFamily: "Fantasy",
          }}
        >
          En uygun
        </span>
        <span
          style={{
            marginLeft: "680px",
            marginTop: "900px",
            position: "absolute",
            color: "rgba(0, 0, 255, 0.9)",
            fontSize: "90px",
            zIndex: "1000",
            userSelect: "none",
            fontFamily: "Fantasy",
          }}
        >
          Yaz Kombinleri
        </span>
        <div // ilk satır divi
          style={{
            backgroundColor: "#C2C2C2",
            color: "black",
            height: "auto",
            borderRadius: "5px",
            overflow: "hidden", // Animasyonun dışarı taşmaması için
          }}
        >
          <a
            href="https://www.getchostore.com/cdn/shop/products/mosca-kadin-el-cantasi-ve-carpaz-canta-38087.jpg?v=1693656172"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block" }}
          >
            <span
              style={{
                wordBreak: "break-word",
                whiteSpace: "normal",
                display: "block",
                userSelect: "none",
                position: "relative",
              }}
            >
              <img
                src="https://www.getchostore.com/cdn/shop/products/mosca-kadin-el-cantasi-ve-carpaz-canta-38087.jpg?v=1693656172"
                alt="Kadın Çanta"
                style={{
                  width: "700px",
                  height: "1080px",
                  transition: "transform 0.3s ease",
                }}
                className="hover-image"
              />
            </span>
          </a>
        </div>

        <div
          style={{
            backgroundColor: "#C2C2C2",
            color: "black",
            height: "auto",
            borderRadius: "5px",
            overflow: "hidden", // Animasyonun dışarı taşmaması için
          }}
        >
          <a
            href="https://cdn.swist.com.tr/beyaz-yeni-nirvana-baskili-oversize-kadin-tshirt-tisort-swist-29221-17-B.jpg"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block" }}
          >
            <span
              style={{
                wordBreak: "break-word",
                whiteSpace: "normal",
                display: "block",
                userSelect: "none",
              }}
            >
              <img
                src="https://cdn.swist.com.tr/beyaz-yeni-nirvana-baskili-oversize-kadin-tshirt-tisort-swist-29221-17-B.jpg"
                alt="Kadın Giyim"
                style={{
                  width: "700px",
                  height: "1080px",
                  transition: "transform 0.3s ease",
                }}
                className="hover-image"
              />
            </span>
          </a>
        </div>
        <div
          style={{
            backgroundColor: "#C2C2C2",
            color: "black",
            height: "auto",
            borderRadius: "5px",
            overflow: "hidden", // Animasyonun dışarı taşmaması için
          }}
        >
          <a
            href="https://cdn.swist.com.tr/beyaz-yeni-nirvana-baskili-oversize-kadin-tshirt-tisort-swist-29221-17-B.jpg"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block" }}
          >
            <span
              style={{
                wordBreak: "break-word",
                whiteSpace: "normal",
                display: "block",
                userSelect: "none",
              }}
            >
              <img
                src="https://img.joomcdn.net/e9cfe2138bd83e3af0bf8621960294b1f59cd268_original.jpeg"
                alt="Erkek Giyim"
                style={{
                  width: "700px",
                  height: "1080px",
                  transition: "transform 0.3s ease",
                }}
                className="hover-image"
              />
            </span>
          </a>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: "#C2C2C2",
            color: "black",
            height: "auto",
            borderRadius: "5px",
            overflow: "hidden", // Animasyonun dışarı taşmaması için
          }}
        >
          <a
            href="https://cdn.swist.com.tr/beyaz-yeni-nirvana-baskili-oversize-kadin-tshirt-tisort-swist-29221-17-B.jpg"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block" }}
          >
            <span
              style={{
                wordBreak: "break-word",
                whiteSpace: "normal",
                display: "block",
                userSelect: "none",
              }}
            >
              <img
                src="https://c.wallhere.com/photos/a8/21/1920x1080_px_beach_landscape_nature_sea-1078862.jpg!d"
                alt="Air Jordan"
                style={{
                  width: "auto",
                  height: "1200px",
                  transition: "transform 0.3s ease",
                }}
                className="hover-image"
              />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
