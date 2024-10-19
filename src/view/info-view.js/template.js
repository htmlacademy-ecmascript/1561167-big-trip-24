const createInfoTemplate = ({ title, startDate, endDate, costValue }) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${startDate}&nbsp;—&nbsp;${endDate}</p>
    </div>

    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${costValue.toString()}</span>
    </p>
  </section>`;

export { createInfoTemplate };
