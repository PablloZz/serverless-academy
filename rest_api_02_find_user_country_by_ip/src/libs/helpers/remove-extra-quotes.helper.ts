function removeExtraQuotes(string: string) {
  return string.replace(/['|"]/g, "");
}

export { removeExtraQuotes };
