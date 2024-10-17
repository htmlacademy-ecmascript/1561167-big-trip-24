const createInfoTemplate = ({ title, startDate, endDate, costValue }) => {
  const startDateTemplate = startDate.toString();
  const endDateTemplate = endDate.toString();
  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>

        <p class="trip-info__dates">${startDateTemplate}&nbsp;—&nbsp;${endDateTemplate}</p>
      </div>

      <p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${costValue.toString()}</span>
      </p>
    </section>`;
};

export { createInfoTemplate };
