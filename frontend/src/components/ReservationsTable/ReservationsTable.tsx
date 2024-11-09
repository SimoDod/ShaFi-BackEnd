import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Icon from "../common/Icon/Icon";
import { ReservationResponse } from "../../types/Reservation";
import { format, parseISO } from "date-fns";
import { dateFormats } from "../../utils/date/formatDateToString";

type Props = {
  reservations: ReservationResponse[];
};

const ReservationsTable = ({ reservations }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th className="text text-primary">Note</th>
            <th className="text text-primary">Reserved</th>
            <th className="text text-primary">Paid</th>
            <th className="text text-primary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(
            ({ note, reservationStart, reservationEnd, paid, _id }) => (
              <tr key={_id}>
                <td>{note}</td>
                <td>
                  <div>
                    {format(
                      parseISO(reservationStart),
                      dateFormats.defaultLine
                    )}
                  </div>
                  <div className="divider divider-primary w-16 m-0 ml-1" />
                  <div>
                    {format(parseISO(reservationEnd), dateFormats.defaultLine)}
                  </div>
                </td>
                <td>{paid}</td>
                <td>
                  <button className="btn btn-link">
                    <Icon icon={faEdit} />
                  </button>
                  <button className="btn btn-link">
                    <Icon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsTable;
