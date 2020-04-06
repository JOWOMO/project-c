export default (loading ,isLoading, countModifier, nuxtContext) => {
   loading += countModifier
  console.log('Global loading', loading, countModifier)
}