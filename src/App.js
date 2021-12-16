import { useState, useEffect } from 'react';

function App() {
    const [ gameTitle, setGameTitle ] = useState("");
    const [ searchedGames, setSearchedGames ] = useState([]);
    const [ gameDeals, setGameDeals] = useState([]);

    const searchGame = () => {
        fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=4`)
            .then((response) => response.json())
            .then((data) => {
                setSearchedGames(data)
            });
    };

    useEffect(() => {
        fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=6`)
            .then((response) => response.json())
            .then((data) => {
                setGameDeals(data)
            });
    })

    return (
        <div className="container-fluid mx-auto  ">

            <div className="relative bg-gray-900 ">
                <div className="absolute inset-x-0 bottom-0">
                    <svg
                        viewBox="0 0 224 12"
                        fill="currentColor"
                        className="w-full -mb-1 text-white"
                        preserveAspectRatio="none"
                    >
                        <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
                    </svg>
                </div>
                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
                        <h2 className="mb-6 mt-8 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                            Search for today's
                            <br className="hidden md:block" />
                            hottest and latest games{' '}
                        </h2>
                        <p className="mb-6 text-base font-thin tracking-wide text-gray-300 md:text-lg">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem.

                        </p>
                        <div className="flex flex-col items-center w-full mb-10 md:flex-row md:px-16">
                            <input
                                placeholder="Minecraft "
                                type="search"
                                className="flex-grow w-full h-12 px-4 mb-3 text-white transition duration-200 bg-transparent border-2 border-gray-400 rounded appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-200 focus:outline-none focus:shadow-outline"
                                onChange={(event) => {
                                    setGameTitle(event.target.value)
                                }}
                            />
                            <button
                                onClick={searchGame}
                                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none">
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="container mx-auto flex place-content-center">
                    { searchedGames.map((game, key) => {
                        return (
                            <div key={key} className="px-2 py-2 ">

                                <img src={game.thumb} alt={game.external} className="rounded shadow-md"/>
                                <h3 className="text-white px-2  pt-2">{game.external}</h3>
                                <p className="text-white py-1 px-2">$ {game.cheapest}</p>
                            </div>
                        )
                    })}
                    </div>


                </div>
            </div>



            <div className=" container mx-auto px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <h1 className="text-center text-3xl font-extrabold tracking-widest text-gray-900 my-6">
                    Latest Deals
                </h1>
                <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full mx-auto">


                {gameDeals.map((game, key) => {
                    return (


                    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
                        <img
                            src={game.thumb} alt=""
                            className="object-cover w-full h-64"
                            alt={game.title}
                        />
                        <div className="p-5 border border-t-0">

                            <h3 className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700">
                                {game.title}
                            </h3>
                            <p className="mb-2 text-gray-700">
                                Normal Price: {game.normalPrice}
                            </p>
                            <p className="mb-2 text-gray-700">
                                Sale Price: {game.salePrice}
                            </p>

                        </div>
                    </div>
                    )

                })}

            </div>



</div>
        </div>

    );
}

export default App;
