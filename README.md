# Task3　　

## JSXとは　　
JSX(JavaScript XML)はJavaScriptファイル内にHTMLのようなコードを記述できるようにするもの。　　
JSXの構文はHTMLに似ている。  

## 三項演算子　　
**条件　？　真の時の値　：　偽の時の値**  

ex)product.isFruit ? 'magenta' : 'darkgreen'  
→product.isFruitが真ならmagenta  
 product.isFruitが偽ならdarkgreen  

~~~
 export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
~~~

## チュートリアルから　　
+ React コンポーネントからはJSX 要素を複数隣り合わせて返すのではなく、単一の JSX 要素を返す必要がある。  
これを修正するには、複数の隣接する JSX 要素はフラグメント（<> および </>）で囲むようにする。

**また、divを用いることで行単位でグループ化してグリッド状にマス目を並べられる**  

~~~
export default function Square() {
  return (
    <>
      <button className="square">X</button>
      <button className="square">X</button>
    </>
  );
}
~~~  

+ 何かを記憶するためにはstateというものを使用する  
useStateという関数を利用  
**value：stateの現在値を格納**  
**setValue：その値を更新するために使う関数**  
**useStateの引数"null"はstate変数の初期値 = valueにはまずnullが入っている**  

~~~
function Square() {
  const [value, setValue] = useState(null);
}
~~~

+ 複数の子コンポーネントからデータを収集したい、あるいは 2 つの子コンポーネント同士で通信したい、と思ったら代わりに親コンポーネントに共有の state を宣言するようにする。  
親コンポーネントはその state を子コンポーネントに prop 経由で渡すことができます。これにより、子同士および親子間で、コンポーネントが同期されるようになります。



