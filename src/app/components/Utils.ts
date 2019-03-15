import swal from "sweetalert2";
import * as moment from "moment";
import { environment } from "@env/environment";

export class Utils {
	static msgError(mensaje) {
		if (!environment.production) {
			console.log(mensaje);
		}

        // HTTP ERROR RESPONSE
        if (mensaje.error.message) {
            return mensaje.error.message;
        }

        // VALIDATIONS API
        if (Array.isArray(mensaje.error)) {
            return mensaje.error[0].param + ' ' + mensaje.error[0].msg;
        }

        // SQL ERROR
        if (mensaje.error.errmsg) {
            return mensaje.error.errmsg;
        }

        return undefined;
	}

	static msgErrorImage(mensaje, titulo = "Error") {
		try {
			if (mensaje === undefined) {
				this.showMsgError("El error esta indefinido", titulo);
			} else {
				this.showMsgError(mensaje.error.message, titulo);
			}
		} catch (e) {
			this.showMsgError(JSON.parse(mensaje).message, titulo);
		}
	}

	// Invocacion de metodo para invocar modal y limpieza del formulario invocado
	static invocacionModal(Modal, Formulario) {
		Modal.show();
		Formulario.reset();
	}

	static showMsgInfo(mensaje: string, titulo = "Información") {
		swal(titulo, mensaje, "info").catch(swal.noop);
	}

	static showMsgError(mensaje: string, titulo = "Error") {
		swal(titulo, mensaje, "error").catch(swal.noop);
	}

	static showMsgSucces(mensaje: string, titulo = "Exitoso") {
		swal(titulo, mensaje, "success").catch(swal.noop);
	}

	static formatDateYYYYMMDD(myDate) {
		return moment(myDate).format("YYYY-MM-DD");
	}

	static valorCampoEsValido(valor: any): any {
		let resultado = false;
		if (!(valor === "" || valor === null || valor === undefined)) {
			resultado = true;
		}
		return resultado;
	}

	static notNullOrUndefined(valor: any) {
		let resultado = false;
		if (!(valor === null || valor === undefined)) {
			resultado = true;
		}
		return resultado;
	}

	static getYearDate(myDate) {
		return moment(myDate, "YYYY-MM-DD").year();
	}

	static replaceCharacter(cadena: string) {
		return cadena.replace("-", "");
	}

	static printReport(idReporte, preview, catalogo, nativeWindow) {
		nativeWindow.open(
			"http://localhost:3000/reports?shortid=" + idReporte + "&preview=" + preview + "&catalogoApi=" + catalogo
		);
	}

	static printReportFactura(idReporte, preview, catalogo, idFactura, idEstadoFactura, nativeWindow) {
		nativeWindow.open(
			"http://localhost:3000/reports?shortid=" +
				idReporte +
				"&preview=" +
				preview +
				"&catalogoApi=" +
				catalogo +
				"&IdFactura=" +
				idFactura +
				"&IdEstadoFactura" +
				idEstadoFactura
		);
	}

	static round(value, decimals) {
		return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
	}
}
