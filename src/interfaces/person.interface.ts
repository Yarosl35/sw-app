import INode from './node.interface';
import IPlanet from './planet.interface';
import ISpecies from './species.interface';

export default interface IPerson extends INode {
  birthYear: string;
  gender: string;
  homeworld: IPlanet;
  id: string;
  name: string;
  species: ISpecies;
};