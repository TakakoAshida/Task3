// コンポーネントを作成する
// コンポーネント：再利用可能なコードのこと
import { useState } from 'react';

// Square：子ポーネント
// props：親コンポーネントから子ポー年とに渡されるデータ(Boardから渡されるvalue)
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board：親コンポーネント
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // すでにマス目にXまたはOがある場合何もしない、また勝者が決まったか判定して決まっていたら何もしない
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // squaresのコピーnextSquaresを作成(slice()配列メソッドを用いて)
    // 元データの書き換えを行わないことで過去の手に巻き戻しができるようになる
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // マス目をクリックしたときにGameコンポーネントがBoardを更新できるようにする
    onPlay(nextSquares);
  }

  // ゲームが終了したことを知らせるまたは次のプレイヤーを知らせる
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* onSquareClick={handleClick(0)とすると無限ループが発生してしまう */}
        {/* () => handleClick(0)：アロー関数でクリックされると=>後のコードが実行される */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// export：外部からアクセスできるようにする
// default：メイン関数であることの印
export default function Game() {
  // history：過去の手を保存するための配列
  // Array(9).fill(null)：9個の要素を持つ配列を作成、要素をnullに設定
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // currentMove：現在の手が何番目の着手であるかを管理
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // ゲーム内容を更新する関数
  function handlePlay(nextSquares) {
    // [...history, nextSquares]：historyの全ての要素の後にnextSquaresを追加した新しい配列を作成
    // ...history：スプレッド構文で「historyに全ての項目をここに列挙せよ」と読む
    // ...history.slice(0, currentMove + 1)とすることで履歴のうち着手時点までの部分のみが保持されるようにする
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // 過去の着手に戻るための関数
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // 過去のhistoryをmapで変換して過去の着手に戻れるようにする
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      // key：特別に予約されたプロパティ。要素が作成されるとkeyプロパティを抽出し返される要素にkeyを格納
      // 手番のインデックスをkeyとして使用
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* Boardに3つをpropsとして渡すようにする */}
        {/* onPlay：新たな盤面の状態を伝えるための関数 */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// 勝者を計算する関数
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
