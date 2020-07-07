const FIELDS = {
  Layout: 'layout',
  Title: 'title',
  Subheading_1: 'subheading_1',
  Subheading_2: 'subheading_2',
  Listing: 'listing',
  Images: 'images',
  Assets: 'assets',
  Links: 'links',
  Buttons: 'buttons'
};

const FIELD_TYPES = {
  Array: 'Array',
  Symbol: 'Symbol',
  Text: 'Text'
};

const LAYOUT_OVERWRITES = {
  Article: { [FIELDS.Assets]: { omitted: true }, [FIELDS.Listing]: { omitted: true } },
  'Case Study': {
    [FIELDS.Buttons]: { omitted: true },
    [FIELDS.Links]: { omitted: true },
    [FIELDS.Listing]: { omitted: true },
    [FIELDS.Subheading_2]: { omitted: true }
  },
  'E-Book': {},
  Generic: {
    [FIELDS.Subheading_2]: { omitted: true },
    [FIELDS.Title]: { label: 'My Title' }
  },
  Privacy: {
    [FIELDS.Assets]: { omitted: true },
    [FIELDS.Buttons]: { omitted: true },
    [FIELDS.Links]: { omitted: true },
    [FIELDS.Listing]: { omitted: true },
    [FIELDS.Subheading_2]: { omitted: true }
  },
  'Team Member': {
    [FIELDS.Assets]: { omitted: true },
    [FIELDS.Buttons]: { omitted: true },
    [FIELDS.Subheading_2]: { omitted: true },
    [FIELDS.Links]: { omitted: true },
    [FIELDS.Listing]: { omitted: true }
  },
  Teaser: {
    [FIELDS.Title]: { label: 'My Teaser Title' },
    [FIELDS.Assets]: { omitted: true },
    [FIELDS.Buttons]: { omitted: true },
    [FIELDS.Links]: { omitted: true },
    [FIELDS.Subheading_1]: { omitted: true },
    [FIELDS.Subheading_2]: { omitted: true }
  },
  Testimonial: {
    [FIELDS.Assets]: { omitted: true },
    [FIELDS.Buttons]: { omitted: true },
    [FIELDS.Links]: { omitted: true },
    [FIELDS.Listing]: { omitted: true }
  },
  Video: undefined,
  Webinar: null
};

export { FIELDS, FIELD_TYPES, LAYOUT_OVERWRITES };
