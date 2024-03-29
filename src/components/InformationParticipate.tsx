import {
  BaseError,
  useAccount,
  useBalance,
  useConfig,
  useReadContract,
} from "wagmi";
import { writeContract } from "wagmi/actions";
import Button from "~/components/ui/Button";
import { abi } from "../utils/abi";
import { addressContract } from "../../config";

export const InformationParicipate = () => {
  const config = useConfig();
  const { address } = useAccount();

  const onParticipate = async () => {
    try {
      const result = await writeContract(config, {
        abi,
        address: addressContract,
        functionName: "participate",
        value: BigInt(10000000000000000),
      });
    } catch (e) {
      const error = e as BaseError;
      console.log(error);
    }
  };

  const balance = useBalance({
    address: address,
  });

  const result = useReadContract({
    address: addressContract,
    abi: abi,
    functionName: "bidPrice",
  });
  const user = useReadContract({
    address: addressContract,
    abi: abi,
    functionName: "users",
    args: [address],
  });

  const lengthParticipants = useReadContract({
    address: addressContract,
    abi: abi,
    functionName: "lengthParticipants",
  });

  const data: any[] = user.data as any[];
  const roundedNumber = balance.data
    ? parseFloat(Number(balance.data.formatted).toFixed(4))
    : 0;

  return (
    <div>
      {data ? (
        data[1] ? (
          <div>
            <p>Вы уже учавствуете</p>
            <p>
              Номер вашего билета:<span>{Number(data[0])}</span>
            </p>
          </div>
        ) : (
          <Button onClick={() => onParticipate()}>PARTICIPATE</Button>
        )
      ) : (
        <div></div>
      )}
      <p>
        price:{" "}
        <span>
          {Number(result.data ? result.data : 0) * 0.000000000000000001}
        </span>{" "}
        ETH
      </p>
      <p>
        on your account: <span>{roundedNumber}</span> ETH
      </p>
      <p>
        are already participating:{" "}
        <span>
          {lengthParticipants.data ? Number(lengthParticipants.data) : "0"}
        </span>
        / 10
      </p>
    </div>
  );
};
