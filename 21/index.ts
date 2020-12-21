import { MultiMap } from '@nw55/common';
import { backtrackMatch, compareStrings, runDay } from '../utils';

runDay(__dirname, {}, async input => {

    const foods = input.map(line => {
        const match = /^((?:\w+ ?)+) \(contains ((?:\w+(?:, )?)+)\)$/.exec(line);
        if (!match)
            throw new Error('!1 ' + line);
        const ingredients = match[1].split(' ');
        const allergens = match[2].split(', ');
        return { ingredients, allergens };
    });

    const allIngredients = new Set(foods.flatMap(food => food.ingredients));
    const foodIngredientsByAllergen = new MultiMap(foods.flatMap(food => food.allergens.map(allergen => [allergen, new Set(food.ingredients)])));

    const allergenCandidates = new Map<string, Set<string>>();
    for (const [allergen, foodIngredients] of foodIngredientsByAllergen.groupedEntries()) {
        const candidates = new Set(allIngredients);
        for (const ingredients of foodIngredients) {
            for (const ingredient of candidates) {
                if (!ingredients.has(ingredient))
                    candidates.delete(ingredient);
            }
        }
        allergenCandidates.set(allergen, candidates);
    }

    const matches = backtrackMatch<string, string>(allergenCandidates);
    if (!matches)
        throw new Error('!2');

    const result1 = foods
        .flatMap(food => food.ingredients)
        .filter(ingredient => !matches.hasValue(ingredient))
        .length;

    console.info('#1', result1);

    const result2 = [...matches]
        .sort((a, b) => compareStrings(a[0], b[0]))
        .map(x => x[1])
        .join(',');

    console.info('#2', result2);

});
