export const goalDefinitions = {
  calories: {label:'Calories', field:'calories', operator:'max', unit:'kcal'},
  protein: {label:'Protein', field:'protein_g', operator:'min', unit:'g'},
  fiber: {label:'Fiber', field:'fiber_g', operator:'min', unit:'g'}
};
export function validateGoals(draft) {
  const values = {}, errors = {};
  for (const [key, definition] of Object.entries(goalDefinitions)) {
    if (!draft[key]?.enabled) continue;
    const raw = String(draft[key].value ?? '').trim();
    const value = Number(raw);
    if (raw === '' || !Number.isFinite(value) || value < 0 || (key === 'calories' && !Number.isInteger(value))) {
      errors[key] = `Enter ${key === 'calories' ? 'a whole number' : 'a number'} of 0 or more.`;
    } else values[key] = value;
  }
  return {valid:Object.keys(errors).length === 0, values, errors};
}
export function matchesGoals(product, goals) {
  return Object.entries(goals).every(([key, limit]) => {
    const definition = goalDefinitions[key];
    if (!definition || !Number.isFinite(limit) || limit < 0) return false;
    const value = product[definition.field];
    if (typeof value !== 'number' || !Number.isFinite(value)) return false;
    return definition.operator === 'max' ? value <= limit : value >= limit;
  });
}
export function goalText(key,value) {
  const definition = goalDefinitions[key];
  return `${definition.label} ${definition.operator === 'max' ? '≤' : '≥'} ${value} ${definition.unit}`;
}
export function filterProducts(products, goals, query = 'bars', brands = []) {
  const text = query.trim().toLocaleLowerCase();
  return products.filter(product => matchesGoals(product,goals) && (!brands.length || brands.includes(product.id)) && (`${product.name} ${product.category === "calories" ? "popcorn" : "bars"}`.toLocaleLowerCase().includes(text)));
}
