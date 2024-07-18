import usePage from "../../../hooks/usePage";

export default function RollResult() {
  const { rollResult } = usePage();
  const backgroundRarity = (item) => {
    const rarity = item.weapon ? item.weapon.rarity : item.character.rarity;
    switch (rarity) {
      case "SSR":
        return "bg-ssr";
      case "SR":
        return "bg-sr";
      default:
        return "bg-r";
    }
  };
  return (
    <div className="flex flex-row justify-center gap-1">
      {rollResult.map((item, index) => (
        <div
          key={index}
          className={`${backgroundRarity(item)} shadow-md rounded-md`}
        >
          {item.weapon ? (
            <div className="flex flex-col">
              <img
                className="w-24"
                src={item.weapon.iconImg}
                alt={item.weapon.name}
              />
              <div className="flex w-24 h-8 bg-white rounded-b-md z-30 items-center justify-center">
                <p className="text-xs text-center font-semibold">
                  {item.weapon.name}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <img
                className="w-24"
                src={item.character.iconImg}
                alt={item.character.name}
              />
              <div className="flex w-24 h-8 bg-white rounded-b-md z-30 items-center justify-center">
                <p className="text-xs text-center font-semibold">
                  {item.character.name}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
