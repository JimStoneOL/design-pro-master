import morning from '../img/morning.jpg'

export const AboutPage=()=>{
    return(
        <div className="row">
        <div className="">
          <div className="card center">
            <div className='teal lighten-2'>
            <div className="card-content white-text">
          <img class="" width="265" height="200" src={morning}/>
              <span className="card-title"></span>
              <p>  Мы компания производящая продукцию по вашим заказам. <br/>
                Наше отличие от остальных производителей в том, что мы изготавливаем <br/>
                всё по вашему усмотрению. Вы сами выбираете, как будет выглядить ваш товар. <br/>
                Мы предлагаем вам создать продукт, а с ним и ткань и фурнитуру. Всё что вы создали <br/>
                сохраняется, в вашем кабинете и вы можете повторно закать, то что вы ранее создали в нашем конструкторе.
                Помимо этого мы предлагаем поставки по всей России, с возможность отслеживать стадии вашего заказа. <br/>
                Удачных вам покупок :) .</p>
            </div>
            </div>
          </div>
        </div>
        
      </div>
    )
}