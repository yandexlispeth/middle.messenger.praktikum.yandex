const validateList: Record<string, RegExp> = {
  first_name: /^[A-ZА-Я]{1}[a-zа-я\\-]*$/g,
  second_name: /^[A-ZА-Я]{1}[a-zа-я\\-]*$/g,
  login: /^(?!\d+$)[a-zA-Z0-9\-_]{3,20}$/g,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password:
    /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  oldPassword:
    /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  newPassword:
    /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  newPasswordAgain:
    /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  phone: /^\+?\d{10,15}$/,
  message: /.*/,
};

export function validate(type: string, value: string): string {
  const re = validateList[type];
  if (re && (!value || !value.trim())) {
    return "Empty";
  }

  if (!value.match(re)) {
    return "Ошибка в форме";
  }
  return "";
}
