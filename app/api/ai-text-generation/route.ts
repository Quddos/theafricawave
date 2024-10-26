// app/api/ai-text-generation/route.ts
import { OpenAIClient } from "@azure/openai";  
import { AzureKeyCredential } from "@azure/core-auth"; // If AzureKeyCredential is in core-auth


const client = new OpenAIClient(
  process.env.AZURE_OPENAI_ENDPOINT!,
  new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY!)
)

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const deploymentId = process.env.AZURE_OPENAI_MODEL!
    console.log('Deployment ID:', deploymentId)
    console.log('Prompt:', prompt)

    const result = await client.getCompletions(deploymentId, [prompt], {
      maxTokens: 100,
    })

    console.log('API Response:', result)

    if (result.choices && result.choices.length > 0) {
      return NextResponse.json({ content: result.choices[0].text })
    } else {
      console.error('No choices returned from API')
      return NextResponse.json({ error: 'No content generated' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error generating AI content:', error)
    return NextResponse.json({ error: 'Failed to generate AI content', details: error.message }, { status: 500 })
  }
}
