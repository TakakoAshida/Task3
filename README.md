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

