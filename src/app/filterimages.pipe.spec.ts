import { FilterimagesPipe } from './filterimages.pipe';
import { listOfPets, dogsFiltered, catsFiltered } from '../testData.js';

describe('FilterimagesPipe', () => {
  const pipe = new FilterimagesPipe();
  const allFilter = "all";
  const perroFilter = "perro";
  const gatoFilter = "gato";
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should show all images filtered by default or when "all" filter is selected', (): void => {
    const resultAllFilter = pipe.transform(listOfPets, allFilter);
    expect(typeof listOfPets).toBe('object');
    expect(resultAllFilter).toEqual(listOfPets);
    expect(resultAllFilter.length).toEqual(5);
  });

  it('should show perro images when "Perro" filter is selected', () => {
    const resultDogFilter = pipe.transform(listOfPets, perroFilter);
    expect(resultDogFilter).toEqual(dogsFiltered);
    expect(resultDogFilter.length).toEqual(3);
  });

 it('should show gato images when "Gato" filter is selected', () => {
   const resultGatoFilter = pipe.transform(listOfPets, gatoFilter);
    expect(resultGatoFilter).toEqual(catsFiltered);
    expect(resultGatoFilter.length).toEqual(2);
  });

  it('should returns an error when filter does not exist', () => {
    const resultInvalidFilter = pipe.transform(listOfPets, 'allFilter');
    expect(resultInvalidFilter).toEqual([]);
    expect(resultInvalidFilter.length).toEqual(0);
  });
});
