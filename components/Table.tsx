import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Product } from "@stripe/firestore-stripe-payments";

interface Props {
  products: Product[];
  selectedPlan: Product | null;
}

const Table = ({ products, selectedPlan }: Props) => {
  return (
    <table>
      <tbody className='divide-y divide-[gray]'>
        {/* PRICE */}
        <tr className='tableRow'>
          <td className='tableDataTitle'>Monthly price</td>
          {products.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
              key={product.id}
            >
              ${product.prices[0].unit_amount! / 100}
              {/* AED{product.prices[0].unit_amount! / 100} */}
            </td>
          ))}
        </tr>

        {/* META DATA : videoQuality */}
        <tr className='tableRow'>
          <td className='tableDataTitle'>Video quality</td>
          {products.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
              key={product.id}
            >
              {product.metadata.videoQuality}
            </td>
          ))}
        </tr>

        {/* META DATA : resolution */}
        <tr className='tableRow'>
          <td className='tableDataTitle'>Resolution</td>
          {products.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
              key={product.id}
            >
              {product.metadata.resolution}
            </td>
          ))}
        </tr>

        {/* META DATA : protability */}
        <tr className='tableRow'>
          <td className='tableDataTitle'>
            Watch on your TV, computer, mobile phone and tablet
          </td>

          {products.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
              key={product.id}
            >
              {/*Stripe boolean as strings:  product.metadata.portability === "true"  */}
              {product.metadata.portability === "true" ? (
                <CheckIcon className='inline-block h-8 w-8' />
              ) : (
                <XMarkIcon className='inline-block h-8 w-8' />
              )}
            </td>
          ))}

          {/* <td className="tableDataFeature">
            <CheckIcon className="inline-block h-8 w-8" />
          </td>
          <td className="tableDataFeature">
            <CheckIcon className="inline-block h-8 w-8" />
          </td>
          <td className="tableDataFeature">
            <CheckIcon className="inline-block h-8 w-8" />
          </td> */}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
