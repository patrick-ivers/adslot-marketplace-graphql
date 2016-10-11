import _ from 'lodash';
import jsonfile from 'jsonfile';

const file = 'src/data.json';
const data = jsonfile.readFileSync(file);

const getPublishersByName = (publisherName) => {
  const name = _.lowerCase(publisherName);
  return _.filter(data.publishers, (publisher) =>
    _.includes(_.lowerCase(publisher.givenName), name) ||
    _.includes(_.lowerCase(publisher.surname), name) ||
    _.includes(_.lowerCase(publisher.username), name)
  ) || [];
};

const getProductsByPublisherId = (publisherId) => {
  const siteIds = _(data.sites).filter({ 'publisherId': publisherId }).map('id').value();
  return _.filter(data.products, (product) => _.includes(siteIds, product.siteId));
};

const getProductsBySiteName = (siteName) => {
  const name = _.lowerCase(siteName);
  const siteIds = _(data.sites)
    .filter((site) => _.includes(_.lowerCase(site.name), name))
    .map('id')
    .value();

  return _.filter(data.products, (product) => _.includes(siteIds, product.siteId));
};

const getPublisherBySiteId = (siteId) => {
  const publisherId = _.get(_.find(data.sites, { 'id': siteId }), 'publisherId');
  return _.find(data.publishers, { 'id': publisherId });
};

const resolvers = {
  Query: {
    publishers: (root, args) => {
      if (_.has(args, 'id')) {
        return [_.find(data.publishers, { 'id': args.id })];
      } else if (_.has(args, 'name')) {
        return getPublishersByName(args.name);
      } else {
        return data.publishers;
      }
    },
    sites: (root, args) => {
      if (_.has(args, 'id')) {
        return [_.find(data.sites, { 'id': args.id })];
      } else if (_.has(args, 'publisherId')) {
        return _.filter(data.sites, { 'publisherId': args.publisherId });
      } else {
        return data.sites;
      }
    },
    products: (root, args) => {
      if (_.has(args, 'id')) {
        return [_.find(data.products, { 'id': args.id })];
      } else if (_.has(args, 'publisherId')) {
        return getProductsByPublisherId(args.publisherId);
      } else if (_.has(args, 'siteId')) {
        return _.filter(data.products, { 'siteId': args.siteId });
      } else if (_.has(args, 'siteName')) {
        return getProductsBySiteName(args.siteName);
      } else {
        return data.products;
      }
    },
  },
  Publisher: {
    company: (obj, args) => obj.company,
    sites: (obj, args) => _.filter(data.sites, { 'publisherId': obj.id }),
    products: (obj, args) => getProductsByPublisherId(obj.id),
  },
  Site: {
    publisher: (obj, args) => _.find(data.publishers, { 'id': args.publisherId }),
    products: (obj, args) => _.filter(data.products, { 'siteId': obj.id }),
  },
  Product: {
    publisher: (obj, args) => getPublisherBySiteId(obj.siteId),
    site: (obj, args) => _.find(data.sites, { 'id': obj.siteId }),
  },
};

export default resolvers;
