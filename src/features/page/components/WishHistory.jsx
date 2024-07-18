import usePage from "../../../hooks/usePage";

export default function WishHistory() {
  const { rollHistory } = usePage();

  const charHistory = rollHistory.filter((item) => item.bannerItem.character);

  const charCount = charHistory.reduce((acc, item) => {
    acc[item.bannerItem.character.name]
      ? (acc[item.bannerItem.character.name] += 1)
      : (acc[item.bannerItem.character.name] = 1);
    return acc;
  }, {});

  const charUniqueName = {};
  const uniqueCharHistory = charHistory.filter((item) => {
    const charName = item.bannerItem?.character?.name;
    if (charName && !charUniqueName[charName]) {
      charUniqueName[charName] = true;
      return true;
    }
    return false;
  });

  const charCountWithImg = uniqueCharHistory.map((item) => {
    item.count = charCount[item.bannerItem.character.name];
    return item;
  });

  charCountWithImg.sort(
    (a, b) =>
      b.bannerItem.character.rarity.localeCompare(
        a.bannerItem.character.rarity
      ) ||
      a.bannerItem.character.name.localeCompare(b.bannerItem.character.name)
  );

  const weaponHistory = rollHistory.filter((item) => item.bannerItem.weapon);

  const weaponCount = weaponHistory.reduce((acc, item) => {
    acc[item.bannerItem.weapon.name]
      ? (acc[item.bannerItem.weapon.name] += 1)
      : (acc[item.bannerItem.weapon.name] = 1);
    return acc;
  }, {});

  const weaponUniqueName = {};
  const uniqueWeaponHistory = weaponHistory.filter((item) => {
    const weaponName = item.bannerItem?.weapon?.name;
    if (weaponName && !weaponUniqueName[weaponName]) {
      weaponUniqueName[weaponName] = true;
      return true;
    }
    return false;
  });

  const weaponCountWithImg = uniqueWeaponHistory.map((item) => {
    item.count = weaponCount[item.bannerItem.weapon.name];
    return item;
  });

  weaponCountWithImg.sort(
    (a, b) =>
      b.bannerItem.weapon.rarity.localeCompare(a.bannerItem.weapon.rarity) ||
      a.bannerItem.weapon.name.localeCompare(b.bannerItem.weapon.name)
  );

  const backgroundRarity = (item) => {
    const rarity = item.bannerItem.weapon
      ? item.bannerItem.weapon.rarity
      : item.bannerItem.character.rarity;
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
    <>
      {charCountWithImg.length > 0 && (
        <>
          <div className="p-4">
            <p className="font-semibold text-xl">Character</p>
          </div>
          <div className="p-4 grid grid-cols-4">
            {charCountWithImg.map((item) => (
              <div className="flex p-2" key={item.id}>
                <div
                  className={`${backgroundRarity(item)} shadow-md rounded-md`}
                >
                  <img
                    className="w-24"
                    src={item.bannerItem.character.iconImg}
                    alt={item.bannerItem.character.name}
                  />
                  <div className="flex w-24 h-8 bg-white rounded-b-md z-30 items-center justify-center">
                    <p className="text-xs text-center font-semibold">
                      {item.bannerItem.character.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center pl-1 gap-1">
                  <p className="text-lg font-semibold">&#10005; </p>
                  <p className="text-2xl font-semibold">{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {weaponCountWithImg.length > 0 && (
        <>
          <div className="p-4">
            <p className="font-semibold text-xl">Weapon</p>
          </div>
          <div className="p-4 grid grid-cols-4">
            {weaponCountWithImg.map((item) => (
              <div className="flex p-2" key={item.id}>
                <div
                  className={`${backgroundRarity(item)} shadow-md rounded-md`}
                >
                  <img
                    className="w-24"
                    src={item.bannerItem.weapon.iconImg}
                    alt={item.bannerItem.weapon.name}
                  />
                  <div className="flex w-24 h-8 bg-white rounded-b-md z-30 items-center justify-center">
                    <p className="text-xs text-center font-semibold">
                      {item.bannerItem.weapon.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center pl-1 gap-1">
                  <p className="text-lg font-semibold">&#10005; </p>
                  <p className="text-2xl font-semibold">{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
