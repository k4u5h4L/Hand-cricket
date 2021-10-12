import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    const [score, setScore] = useState<number>(0);
    const [innings, setInnings] = useState<number>(1);
    const [target, setTarget] = useState<number>(0);

    const [youPut, setYouPut] = useState<number>(0);
    const [hePut, setHePut] = useState<number>(0);

    const hePutHandler = (): number => {
        const randNum = Math.floor(Math.random() * 6) + 1;

        setHePut(randNum);

        return randNum;
    };

    const youPutHandler = (value: number): void => {
        setYouPut(value);
        console.log(value);

        const comp = hePutHandler();

        if (value == comp) {
            alert(`you are out! Your score is ${score}`);
            // router.reload();
            setInnings((prevVal) => prevVal + 1);
            setTarget(score);
            setScore(0);
        } else {
            if (innings == 2) {
                setTarget((prevVal) => prevVal - value);
            }
            setScore((prevVal) => prevVal + value);
        }

        if (innings == 2) {
            if (target <= 0) {
                alert("Computer won");
                router.reload();
            } else {
                alert(`You won`);
                router.reload();
            }
        }
    };

    return (
        <>
            <div>
                <div>
                    <h2>You</h2>
                    <h3>
                        put: <b>{youPut}</b>
                    </h3>
                </div>

                <div>
                    <h2>Computer</h2>
                    <h3>
                        put: <b>{hePut}</b>
                    </h3>
                </div>

                <h1>
                    Score: <b>{score}</b>
                </h1>

                {innings == 2 ? (
                    <h2>
                        To Win: <b>{target}</b>
                    </h2>
                ) : null}
            </div>

            <div>
                <button onClick={() => youPutHandler(1)}>1</button>
                <button onClick={() => youPutHandler(2)}>2</button>
                <button onClick={() => youPutHandler(3)}>3</button>
                <button onClick={() => youPutHandler(4)}>4</button>
                <button onClick={() => youPutHandler(5)}>5</button>
                <button onClick={() => youPutHandler(6)}>6</button>
            </div>

            <div>
                You are: <b>{innings == 1 ? "batting" : "bowling"}</b>
            </div>
        </>
    );
}
