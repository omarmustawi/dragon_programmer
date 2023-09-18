export default function Alert(props) {
  return (
    <div className="p-4 rounded-2xl bg-white m-auto text-green-600 font-bold shadow-md">
      <h1> Yeah ✔ The Operation is 💯 Completed Successfully 👍 </h1>
      <h2> {props.message} </h2>
    </div>
  );
}
