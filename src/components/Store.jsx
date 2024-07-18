/* eslint-disable react/prop-types */
export default function Store({ itemArr }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-flow-dense gap-4">
      {itemArr.map((item) => (
        <div
          key={item.id}
          className="relative flex flex-col justify-between border-2 shadow-md w-auto max-w-60 2xl:max-w-none rounded-lg gap-2 p-1 hover:bg-gray-300 hover:cursor-pointer"
          onClick={item.onClick}
        >
          {item.bonus && (
            <div className="absolute w-10 p-2 bg-emerald-400 shadow-md -top-4 -right-4 rounded-full">
              <p className="text-white font-semibold">X 2</p>
            </div>
          )}
          <div>
            <p className="text-center font-semibold">{item.name}</p>
          </div>
          <div className="flex items-center justify-center">
            <img src={item.img} alt={item.name} className="w-24" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-center font-semibold">{item.price}</p>
            {item.currencyImg ? (
              <img
                src={item.currencyImg}
                alt={item.currencyName}
                className="w-5"
              />
            ) : (
              <p className="font-semibold">{item.currencyName}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
