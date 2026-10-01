import { NextRequest, NextResponse } from 'next/server';
import { generateMockPrediction } from '@/lib/mock-predict';

export async function POST(req: NextRequest) {
  try {
    let seedHint: string | undefined = undefined;
    let customImageUrl: string | undefined = undefined;

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const hint = formData.get('hint') as string | null;

      if (file) {
        seedHint = file.name;
      }
      if (hint) {
        seedHint = (seedHint ? `${seedHint} ${hint}` : hint);
      }
    } else {
      // JSON body
      try {
        const body = await req.json();
        seedHint = body.hint || body.plantName || body.fileName;
        if (body.imageUrl) {
          customImageUrl = body.imageUrl;
        }
      } catch {
        // empty body is acceptable
      }
    }

    // Small delay to simulate realistic neural network inference
    await new Promise(resolve => setTimeout(resolve, 600));

    // Generate mock diagnosis matching the prompt requirement:
    // { plant, disease, confidence, symptoms, treatment }
    const diagnosis = generateMockPrediction(seedHint);

    if (customImageUrl) {
      diagnosis.imageUrl = customImageUrl;
    }

    return NextResponse.json({
      plant: diagnosis.plant,
      disease: diagnosis.disease,
      confidence: diagnosis.confidence,
      symptoms: diagnosis.symptoms,
      treatment: diagnosis.treatment,
      // Rich supplementary fields for UI
      id: diagnosis.id,
      scientificName: diagnosis.scientificName,
      diseaseLatin: diagnosis.diseaseLatin,
      severity: diagnosis.severity,
      organicTreatment: diagnosis.organicTreatment,
      chemicalTreatment: diagnosis.chemicalTreatment,
      prevention: diagnosis.prevention,
      imageUrl: diagnosis.imageUrl,
      timestamp: diagnosis.timestamp,
    });
  } catch (error) {
    console.error('Ошибка в /api/predict:', error);
    return NextResponse.json(
      { error: 'Не удалось обработать изображение. Попробуйте еще раз.' },
      { status: 500 }
    );
  }
}
