import _ from 'lodash';
import jsonfile from 'jsonfile';

const file = 'src/data.json';
const data = jsonfile.readFileSync(file);

const resolvers = {
  Query: {
    publisher: (root, args) => {
      if (_.has(args, 'id')) {
        return [_.find(data.publishers, { id: args.id })];
      } else if (_.has(args, 'name')) {
        const name = _.lowerCase(args.name);
        return _.filter(data.publishers, (p) =>
          _.lowerCase(p.givenName).includes(name) ||
          _.lowerCase(p.surname).includes(name) ||
          _.lowerCase(p.username).includes(name)
        ) || [];
      } else {
        return data.publishers;
      }
    },
  },
  Publisher: {
    company: (obj, args) => obj.company,
  },
};

export default resolvers;



