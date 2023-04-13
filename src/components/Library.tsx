import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Library.scss';

interface Resource {
  displayName: string;
  year: number;
  category: string;
  tuneType: string;
  workshop: string;
  source: string;
}

const ToRow = (r: Resource) => {
  return (
    <tr key={`${r.displayName}-${r.category}`}>
      <td>
        <div className="media">
          <i
            className={
              'me-3 fas ' +
              (r.category === 'Recording' ? 'fa-music' : 'fa-file')
            }
            title={r.category}
          ></i>
          <div className="media-body">
            <a href={`/resources/${r.year}/${r.source}`} target="_blank">
              <h5 className="media-heading">{r.displayName}</h5>
            </a>
            <div>{`${r.tuneType}, from ${r.workshop} ${r.year}`}</div>
          </div>
        </div>
      </td>
    </tr>
  );
};

const Library = (x: { resources: Resource[] }) => {
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState<string | null>(null);

  const resources = x.resources;
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
    const nTuneType = normalize(r.tuneType);

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
              .map(ToRow)}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Library;
