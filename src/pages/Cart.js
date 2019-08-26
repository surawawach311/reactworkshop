import React, { Component } from 'react'
import { connect } from 'react-redux'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
class Cart extends Component {

    printPDF = () => {

        let result = [];

        result = this.props.cart.map(({ name, price, qty }, index) => {
            return [index + 1, name, price, qty, qty * price]
        });

        const title = ['ลำดับ', 'รายการ', 'ราคา', 'จำนวน', 'รวมเงิน'];

        result.unshift(title);



        // ต้องระบุตามชื่อของ ไฟล์ font
        pdfMake.fonts = {
            THSarabunNew: {
                normal: 'THSarabunNew.ttf',
                bold: 'THSarabunNew-Bold.ttf',
                italics: 'THSarabunNew-Italic.ttf',
                bolditalics: 'THSarabunNew-BoldItalic.ttf'
            },
            Roboto: {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-MediumItalic.ttf'
            }
        }

        let dd = {
            content: [
                { text: 'รายการสั่งซื้อ', style: 'header' },
                {
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto', 100, '*', '*'],

                        body: result
                    }
                }
            ],
            defaultStyle: {
                font: 'THSarabunNew'
            },
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 20, 0, 10]
                },
                subheader: {
                    fontSize: 14
                },
                superMargin: {
                    margin: [20, 0, 40, 0],
                    fontSize: 15
                }
            }
        };

        // const win = window.open('', '_blank');
        // pdfMake.createPdf(dd).print();
        pdfMake.createPdf(dd).open();
    }


    render() {
        return (
            <>
                <div className="container">
                    <div className="row my-5">
                        <div className="col-md-12">
                            <h2>Cart {this.props.total} ชิ้น <button className="btn btn-primary" onClick={this.printPDF}>Print List</button></h2>

                            {
                                this.props.cart.map((m, index) => {
                                    return (
                                        <li key={m.id}>
                                            {index + 1}.{m.name}ราคา{m.price}บาท
                                      </li>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart,
        total: state.cartReducer.total
    }
}
export default connect(mapStateToProps)(Cart);