
import { useState, useMemo } from 'react'; 
import Section from '../components/section';
import Hero from '../components/hero';
import ProductListing from '../components/HomePage/productListing';
import { IoShirtOutline } from "react-icons/io5";
import { PiBaseballCapLight, PiHeadphonesLight, PiPantsLight } from "react-icons/pi";
import { GiConverseShoe } from "react-icons/gi";
import { FaArrowLeft } from "react-icons/fa"; 
import airJordanImg from '../assets/Laye 1.png';
import { useNavigate } from 'react-router-dom';

const categoryIcons = [
  { icon: <IoShirtOutline size={40} />, label: "Camisetas" },
  { icon: <PiPantsLight size={40} />, label: "Calças" },
  { icon: <PiBaseballCapLight size={40} />, label: "Bonés" },
  { icon: <PiHeadphonesLight size={40} />, label: "Headphones" },
  { icon: <GiConverseShoe size={40} />, label: "Tênis" },
];

const productsData = [
  { id: 1, name: "Nike Air Max 270", image: "https://images.tcdn.com.br/img/img_prod/740066/tenis_nike_air_max_270_react_optical_preto_cinza_389_1_20200120160045.jpg", price: 200, priceDiscount: 149.9, category: "Tênis" },
  { id: 2, name: "Adidas Ultraboost", image: "https://authenticfeet.vtexassets.com/arquivos/ids/434723-800-800?v=638562278565370000&width=800&height=800&aspect=true", price: 200, category: "Tênis", priceDiscount: 180 },
  { id: 3, name: "Puma RS-X", image: "https://a-static.mlcdn.com.br/800x560/tenis-puma-rs-x-3d-masculino/b2online/3943110242/53502c5bb7a4aca0addb96f6ac8635a6.jpeg", price: 99.9, category: "Tênis", priceDiscount: 89.9 },
  { id: 4, name: "New Balance 574", image: "data:image/webp;base64,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", price: 150, category: "Tênis", priceDiscount: 120 },
  { id: 5, name: "Asics Gel-Kayano", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQOmQYgZqcuie-UxEBwenfXF5GTzgIXq-ZoUxMiw1PQ0TPB6iExBuM0ZgpydQ_DTqSIQIO_bv2_W49eDpXdctStpaUgXpCUIFAQGmvht_Arz8qmTJ6y-QDo", price: 75, category: "Tênis" },
  { id: 6, name: "Reebok Classic Leather", image: "https://static.hupishop.com.br/public/hupibikes/imagens/produtos/tenis-reebok-classic-nylon-bege-feminino-667d9a2cdd458.jpg", price: 30, category: "Tênis" },
  { id: 7, name: "Vans Old Skool", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzBJ4a69-eDi4bOCihhjxFyiC9WWKC9krq3A&s", price: 200, priceDiscount: 180, category: "Tênis" },
  { id: 8, name: "Converse Chuck Taylor", image: "https://cloviscalcados.vteximg.com.br/arquivos/ids/1036233-1024-1024/Tenis-Masculino-Chuck-Taylor-Converse-All-Star-CT00040007-0320004_001-02.jpg?v=638364710577700000", price: 250, category: "Tênis" },
  { id: 9, name: "Camisa Joy Division", image: "https://stamp.jetassets.com.br/produto/TS1722_2024-09-19_14_33_09_0.jpeg", price: 100, category: "Camisetas" },
  { id: 10, name: "Calça Mom Jeans", image: "https://oqvestir.fbitsstatic.net/img/p/calca-feminina-mom-jeans-azul-178657/463134.jpg?w=1600&h=2133&v=202501231556", price: 400, category: "Calças" },
  { id: 11, name: "Boné MST", image: "https://http2.mlstatic.com/D_NQ_NP_662323-MLB78900818559_092024-O-bone-mst-brim-6-gomos-adulto.webp", price: 200, category: "Bonés" },
  { id: 12, name: "Headphone JBL", image: "https://m.media-amazon.com/images/I/61BDf8KO8AL.__AC_SX300_SY300_QL70_ML2_.jpg", price: 299, category: "Headphones" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // CORREÇÃO: Em vez de usar useEffect + outro useState, calculamos o filtro "on the fly".
  // O useMemo memoriza o resultado e só recalcula se 'selectedCategory' mudar.
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return productsData;
    }
    return productsData.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (categoryLabel) => {
    if (selectedCategory === categoryLabel) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryLabel);
    }
  };

  const goToProducts = () => {
    navigate('/produtos');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Hero />

      <div className="bg-[#f6f6f6] pb-20 pt-10">
        <h2 className="text-2xl font-semibold text-gray-700 px-2 md:px-20 lg:px-40 xl:px-58 mb-6">
          Coleções em destaque:
        </h2>

        <div className="grid sm:grid-cols-4 md:grid-cols-3 gap-3 px-2 md:px-20 lg:px-40 xl:px-58">
          {[ "/collection-1.png", "/collection-2.png", "/collection-3.png", ].map((image, index) => (
            <div key={index} className="relative overflow-visible bg-white rounded-xl shadow aspect-square">
              <img src={image} alt={`Coleção ${index + 1}`} className="w-full h-full object-contain p-4" />
              <div className="absolute top-2 left-4 bg-lime-200 text-[12px] font-bold text-gray-900 px-3 py-[3px] rounded-full z-10">30% OFF</div>
              <div className="absolute bottom-6 left-4 z-10">
                <button onClick={goToProducts} className="bg-white text-pink-600 text-sm font-semibold px-6 py-2 rounded-md shadow hover:bg-pink-100 transition">Comprar</button>
              </div>
            </div>
          ))}
        </div>

        <Section>
          <div className="flex justify-center gap-6 flex-wrap px-4 md:px-0 mt-10">
            {categoryIcons.map((item, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(item.label)}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className={`w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 group-hover:text-pink-600 transition-colors ${selectedCategory === item.label ? 'ring-2 ring-offset-2 ring-pink-600' : ''}`}>
                  {item.icon}
                </div>
                <span className="text-sm text-gray-700 font-medium group-hover:text-pink-600 transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {selectedCategory && (
            <div className="text-center mt-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 mx-auto text-pink-600 font-semibold hover:underline"
              >
                <FaArrowLeft />
                Voltar para todos os produtos
              </button>
            </div>
          )}
        </Section>

        <Section>
          {/* Passamos o 'filteredProducts' calculado pelo useMemo */}
          <ProductListing products={filteredProducts} />
        </Section>
      </div>

      <section className="bg-white py-16 px-4 md:px-20 lg:px-32 flex flex-col md:flex-row items-center gap-12 relative">
        <div className="absolute left-1/2 -translate-x-1/2 md:left-44 md:translate-x-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-t from-white to-purple-200/40 z-0"></div>
        <div className="flex-1 z-10">
          <img src={airJordanImg} alt="Air Jordan edição de colecionador" className="w-full max-w-md ml-0 mx-auto" />
        </div>
        <div className="flex-1 text-center md:text-left z-10">
          <p className="text-sm font-semibold text-pink-600 mb-2">Oferta especial</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-600 leading-tight mb-4">
            Air Jordan edição de<br />colecionador
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip.
          </p>
          <button onClick={goToProducts} className="bg-pink-600 hover:bg-pink-700 text-white px-12 py-2 rounded-lg font-semibold transition">
            Ver Oferta
          </button>
        </div>
      </section>
    </>
  );
};

export default HomePage;