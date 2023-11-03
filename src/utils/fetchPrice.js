export async function fetchCurrentPrice(selectedRegion) {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');

  const priceClasses = ['DK1', 'DK2'];
  const data = {};

  for (const priceClass of priceClasses) {
    const requestUrl = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${selectedRegion}.json`;
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data[priceClass] = await response.json();
  }

  return data;
}



  export async function fetchPriceForDate(date, selectedRegion) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');

  const priceClasses = ['DK1', 'DK2'];
  const data = {};

  for (const priceClass of priceClasses) {
    const response = await fetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${selectedRegion}.json`);
    data[priceClass] = await response.json();
  }

  return data;
}

