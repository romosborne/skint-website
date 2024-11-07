import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Library.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faMusic, faUtensils } from '@fortawesome/free-solid-svg-icons';

type ResourceCategory = 'Recipe' | 'Recording' | 'Sheet Music';

interface Resource {
  displayName: string;
  year: number;
  category: ResourceCategory;
  tuneType?: string;
  workshop?: string;
  source: string;
}

const ResourceRow = (r: Resource) => {
  const icon =
    r.category === 'Recording'
      ? faMusic
      : r.category === 'Recipe'
      ? faUtensils
      : faFile;
  return (
    <tr key={`${r.displayName}-${r.category}`}>
      <td>
        <div className="media">
          <FontAwesomeIcon className="me-3 display-6" icon={icon} />
          <div className="media-body">
            <a href={`/resources/${r.year}/${r.source}`} target="_blank">
              <h5 className="media-heading">{r.displayName}</h5>
            </a>
            <div>{`${r.tuneType ? r.tuneType : r.category}, from ${
              r.workshop ? `${r.workshop} ` : ''
            }${r.year}`}</div>
          </div>
        </div>
      </td>
    </tr>
  );
};

const Library = ({ resources }: { resources: Resource[] }) => {
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState<string | null>(null);

  const years = [...new Set(resources.map((r) => r.year))];

  const filter = (r: Resource) => {
    const normalize = (s: string | null) =>
      s
        ?.toLocaleLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const nSearchFilter = normalize(searchFilter);

    const nDisplayName = normalize(r.displayName);
    const nCategrory = normalize(r.category);
    const nTuneType = normalize(r.tuneType ?? '');

    return (
      (!yearFilter || r.year === yearFilter) &&
      (!nSearchFilter ||
        nDisplayName?.includes(nSearchFilter) ||
        nCategrory?.includes(nSearchFilter) ||
        nTuneType?.includes(nSearchFilter))
    );
  };

  return (
    <>
      <div className="input-group input-group-lg">
        <span className="input-group-addon">
          <i className="glyphicon glyphicon-search"></i>
        </span>
        <input
          type="text"
          id="resource-filter-input"
          className="form-control"
          placeholder="Search"
          onChange={(e) => setSearchFilter(e.target.value)}
        />

        <span className="year-filters">
          <a>
            <div
              className={'year-filter ' + (!yearFilter ? 'selected' : '')}
              onClick={() => setYearFilter(null)}
            >
              All
            </div>
          </a>
          {years.sort().map((y) => (
            <a key={y}>
              <div
                className={
                  'year-filter ' + (y === yearFilter ? 'selected' : '')
                }
                onClick={() => setYearFilter(y)}
              >
                {y}
              </div>
            </a>
          ))}
        </span>
      </div>

      <div>
        <table className="table resource-table">
          <tbody>
            {resources
              .filter(filter)
              .sort((a, b) => a.displayName.localeCompare(b.displayName))
              .map(ResourceRow)}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Library;
